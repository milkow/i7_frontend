import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../environments/environment'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators';

const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  public getCurrentUser(): Observable<any> {
    return this.http.get(`${API_URL}/users/me`)
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
