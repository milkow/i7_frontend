import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../environments/environment'
import { Observable, throwError, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import * as mock from '../shared/mock'
import { User } from '../shared/models/user';
import { FriendRequest } from '../shared/models/friend-request';

const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: User
  constructor(
    private http: HttpClient
  ) {  this.getCurrentUser().subscribe(data => this.currentUser = data) }

  public getCurrentUser(): Observable<any> {
    return this.http.get(`${API_URL}/users/me`)
  }

  public getUsers(): Observable<any> {
    return of(mock.pumks)
  }

  public getFriendRequests(): Observable<any> {
     return this.http.get(`${API_URL}/friend-requests/`)
     .pipe(map(data => (data as Array<FriendRequest>).filter(x => x.sender.id !== this.currentUser.id)))
  }

  public sendFriendRequest(username: string): Observable<any> {
    return this.http.post(`${API_URL}/friend-requests/`, {receiver: username})
  }

  public getPendingRequests(): Observable<any> {
    return this.http.get(`${API_URL}/friend-requests/`).pipe(
      map(data => (data as Array<FriendRequest>).filter(x => x.sender.id === this.currentUser.id))
    )
  }

  public deleteFriendRequest(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/friend-requests/${id}`)
  }

  public acceptFriendRequest(id: string): Observable<any> {
    return this.http.post(`${API_URL}/friend-requests/${id}/accept`, {id: id})
  }

  public getFriends(): Observable<any>  {
     return this.http.get(`${API_URL}/friends/`)
  }

  public deleteFriend(username: string): Observable<any> {
    return this.http.delete(`${API_URL}/friends/${username}`)
  }

  public setPicure(image: File): Observable<any> {
    const data = new FormData()
    data.append('profile_picture_normal', image)

    return this.http.put(`${API_URL}/users/me/profile-picture`, data).pipe(
      catchError(this.handleError<File>('set profile picture'))
    )
  }

  private handleError<T> (operation = 'operation') {
    return (error: any): Observable<T> => {
      console.log(error)
      console.log(`${operation} failed: ${error.message}`)
      return throwError(error.error)
    }
  }
}
