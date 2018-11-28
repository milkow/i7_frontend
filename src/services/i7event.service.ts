import { Injectable } from '@angular/core'
import { environment } from '../environments/environment'
import { Observable, throwError, of } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
import { I7Event } from '../shared/models/i7event'
import { catchError, map, take, filter } from 'rxjs/operators'
import { User } from '../shared/models/user'

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

  public getLikedEvents(page: number, pageSize: number): Observable<I7Event[]> {
    let params = new HttpParams()
    params = params.append('page', page.toString())
    params = params.append('page_size', pageSize.toString())
    params = params.append('liked-only', '1')

    return this.http.get(API_URL + '/events/', {params: params}).pipe(map((data: any) => data.map(event => new I7Event(event))))
  }

  public get(id: string): Observable<I7Event> {
    return this.http.get(`${API_URL}/events/${id}`).pipe(map(data => new I7Event(data)))
  }

  public getParticipants(id: string): Observable<User[]> {
    return this.http.get(`${API_URL}/events/${id}/users/`).pipe(map((data: User[]) => data.map(user => new User(user))))
  }

  public getCommonEvents(userId: string): Observable<I7Event[]> {
    return this.getAll()
  }

  public getEventsOrganizedByUser(userId: string):  Observable<I7Event[]> {
    return this.getAll().pipe(map((data: I7Event[]) => data.filter(ev => ev.author.id === userId).map(ev => new I7Event(ev))))
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

  public like(id: string): Observable<any> {
    return this.http.post(`${API_URL}/events/${id}/like`, {id: id})
  }

  public unlike(id: string): Observable<any> {
    return this.http.post(`${API_URL}/events/${id}/unlike`, {id: id})
  }

  private handleError<T> (operation = 'operation') {
    return (error: any): Observable<T> => {
      console.log(error)
      console.log(`${operation} failed: ${error.message}`)
      return throwError(error)
    }
  }
}
