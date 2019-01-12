import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../environments/environment'
import { Observable, throwError, of, Subject, pipe } from 'rxjs'
import { catchError, map, tap, share, shareReplay } from 'rxjs/operators'
import { User } from '../shared/models/user'
import { FriendRequest } from '../shared/models/friend-request'

const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: User
  private $currentUser: Observable<User>
  private $friendRequest: Subject<FriendRequest[]>
  private $pendingRequest: Subject<FriendRequest[]>
  private $friend = new Subject<User[]>()
  private friendRequests: FriendRequest[]
  private pendingRequests: FriendRequest[]
  private friends: User[]

  constructor (private http: HttpClient) { this.initialize() }

  public initialize() {
    this.$friendRequest = new Subject<FriendRequest[]>()
    this.$pendingRequest = new Subject<FriendRequest[]>()
    this.$friend = new Subject<User[]>()
    this.friends = []
    this.friendRequests = []
    this.pendingRequests = []
    this.currentUser = null
    this.$currentUser = null
  }

  public getCurrentUser(): Observable<User> {
    if (this.currentUser) {
      return of(this.currentUser)
    }

    if (this.$currentUser) {
      return this.$currentUser
    }

    return this.fetchCurrentUser()
  }

  public fetchCurrentUser = (): Observable<User> => {
    return this.$currentUser = this.http.get(`${API_URL}/users/me`)
      .pipe(map(user => new User(user)), tap(user => this.currentUser = user), shareReplay())
  }

  public getUser(id: string):  Observable<any> {
    return this.http.get(`${API_URL}/users/${id}`).pipe(map(user => new User(user)))
  }

  public getFriendRequests = (): Observable<any> => {
     this.http.get(`${API_URL}/friend-requests/`)
     .pipe(map(data => (data as FriendRequest[]).filter(x => x.sender.id !== this.currentUser.id)))
     .subscribe(requests => {
        this.friendRequests = requests as any
        this.$friendRequest.next(this.friendRequests)
     })

     return this.$friendRequest.asObservable()
  }

  public sendFriendRequest(username: string): Observable<any> {
    return this.http.post(`${API_URL}/friend-requests/`, {receiver: username})
  }

  public getPendingRequests(): Observable<any> {
    this.http.get(`${API_URL}/friend-requests/`)
     .pipe(map(data => (data as FriendRequest[]).filter(x => x.sender.id === this.currentUser.id)))
     .subscribe(requests => {
        this.pendingRequests = requests as any
        this.$pendingRequest.next(this.pendingRequests)
     })

     return this.$pendingRequest.asObservable()
  }

  public getPendingFriendRequest(userId: string) {
    return this.http.get(`${API_URL}/friend-requests/?sender=${userId}`).pipe(map(request => new FriendRequest(request[0])))
 }

  public deleteFriendRequest(id: string): Observable<any> {
    this.http.delete(`${API_URL}/friend-requests/${id}`).subscribe(this.getFriendRequests)

    return this.$friendRequest.asObservable()
  }

  public acceptFriendRequest(id: string): Observable<any> {
    this.http.post(`${API_URL}/friend-requests/${id}/accept`, {id: id}).subscribe(pipe(this.getFriendRequests, this.getFriends))

    return this.$friendRequest.asObservable()
  }

  public getFriends = (): Observable<User[]> => {
    this.http.get(`${API_URL}/friends/`).subscribe(friends => {
      this.friends = friends as any
      this.$friend.next(this.friends)
    })

    return this.$friend.asObservable()
  }

  public deleteFriend(username: string): Observable<any> {
    this.http.delete(`${API_URL}/friends/${username}`).subscribe(this.getFriends)

    return this.$friend.asObservable()
  }

  public setPicure(image: File): Observable<any> {
    const data = new FormData()
    data.append('profile_picture_normal', image)

    return this.http.put(`${API_URL}/users/me/profile-picture`, data).pipe(
      catchError(this.handleError<File>('set profile picture'))
    )
  }

  public clearData = (): void => {
    this.initialize()
  }

  private handleError<T> (operation = 'operation') {
    return (error: any): Observable<T> => {
      console.log(error)
      console.log(`${operation} failed: ${error.message}`)
      return throwError(error.error)
    }
  }
}
