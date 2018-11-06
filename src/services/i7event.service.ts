import { Injectable } from '@angular/core'
import { environment } from '../environments/environment'
import { Observable, throwError } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { I7Event } from '../shared/models/i7event'
import { catchError, map } from 'rxjs/operators'

const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class I7EventService {
  constructor(
    private http: HttpClient
  ) { }

  public getAll(): Observable<I7Event[]> {
    return this.http.get(API_URL + '/events/').pipe(map((data: any) => data.map(event => new I7Event(event))))
  }

  public get(id: string): Observable<I7Event> {
    return this.http.get(`${API_URL}/events/${id}`).pipe(map(data => new I7Event(data)))
  }

  public getParticipants(id: string): Observable<any> {
    return this.http.get(`${API_URL}/events/${id}/users/`)
  }

  public create(event: I7Event): Observable<I7Event> {
    (event as any).geo_coordinates = `POINT(${event.coordinates.latitude} ${event.coordinates.longtitude})`

    return this.http.post<I7Event>(API_URL + '/events/create', event).pipe(
      catchError(this.handleError<I7Event>('create Event'))
    )
  }

  public publish(id: string, image: File): Observable<any> {
    const data = new FormData()
    data.append('image_normal', image)

    return this.http.post(`${API_URL}/events/${id}/publish`, data).pipe(
      catchError(this.handleError<I7Event>('publish Event'))
    )
  }
  
  private handleError<T> (operation = 'operation') {
    return (error: any): Observable<T> => {
      console.log(error)
      console.log(`${operation} failed: ${error.message}`)
      return throwError(error)
    }
  }
}
