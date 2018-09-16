import { Injectable } from '@angular/core'
import { environment } from '../environments/environment'
import { Observable, throwError } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Happening } from '../shared/models/Happening'
import { tap, catchError } from 'rxjs/operators'
import { of } from 'rxjs'

const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient
  ) { }

  public getHappenings(): Observable<any> {
    return this.http.get(API_URL + '/happenings/')
  }

  public createHappening(happening: Happening): Observable<Happening> {

    happening.location_latitude = 53.1524890
    happening.location_longitude = 23.1618400

    return this.http.post<Happening>(API_URL + '/happenings/create', happening).pipe(
      catchError(this.handleError<Happening>('create Happening'))
    )
  }

  public publishHappening(id: string, image: File): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
      })
    }

    const data = new FormData()
    data.append('image', image)

    return this.http.post(`${API_URL}/happenings/${id}/publish`, data).pipe(
      catchError(this.handleError<Happening>('publish Happening'))
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
