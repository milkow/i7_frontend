import {Injectable} from '@angular/core'
import {environment} from '../environments/environment'
import {Observable, throwError, of} from 'rxjs'
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http'
import {I7Event} from '../shared/models/i7event'
import {catchError, map, take, filter, tap} from 'rxjs/operators'
import {User} from '../shared/models/user'
import {I7eventImage} from '../shared/models/i7event-image'

const API_URL = environment.apiUrl

interface EventParams {
  'page'?: string
  'page_size'?: string
  'liked-only'?: string
  'geo-coords'?: string
  'geo-range'?: number
  'for-user'?: string
  'start-from'?: string
  'start-to'?: string
  'end-from'?: string
  'end-to'?: string
  'only-ongoing'?: boolean
  past?: boolean
  future?: boolean
  author?: string
}

@Injectable({
  providedIn: 'root'
})
export class I7EventService {
  constructor(
    private http: HttpClient
  ) {
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

  public updatePartial(id: string, body: any): any {
    return this.http.patch(`${API_URL}/events/${id}`, body).pipe(tap(() => console.log(body)))
  }

  public update(i7event: I7Event): any {
    return this.http.put(`${API_URL}/events/${i7event.id}`, i7event)
  }

  public delete(i7eventId: string): Observable<any> {
    return this.http.delete(`${API_URL}/events/${i7eventId}`)
  }

  public getParticipants(id: string): Observable<User[]> {
    return this.http.get(`${API_URL}/events/${id}/users/`).pipe(map((data: any[]) => data.map(user => new User(user.user))))
  }

  public list(params: EventParams = {}): Observable<I7Event[]> {
    let p = new HttpParams()
    for (const k of Object.keys(params)) {
      p = p.append(k, params[k])
    }
    return this.http
      .get(`${API_URL}/events/`, {params: p})
      .pipe(map((data: any) => data.map(event => new I7Event(event))))
  }

  public getCommonEvents(userId: string): Observable<I7Event[]> {
    return this.list()
  }

  public getEventsOrganizedByUser(userId: string): Observable<I7Event[]> {
    return this.list().pipe(map((data: I7Event[]) => data.filter(ev => ev.author.id === userId).map(ev => new I7Event(ev))))
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

  public addUser(i7EventId: string, username: string): Observable<any> {
    return this.http.post(`${API_URL}/events/${i7EventId}/users/`, {username: username})
  }

  public removeUser(i7EventId: string, username: string): Observable<any> {
    return this.http.delete(`${API_URL}/events/${i7EventId}/users/${username}`)
  }

  private handleError<T>(operation = 'operation') {
    return (error: any): Observable<T> => {
      console.log(error)
      console.log(`${operation} failed: ${error.message}`)
      return throwError(error)
    }
  }

  public uploadImage(i7EventId, file: File): Observable<any> {
    const data = new FormData()
    data.append('image_raw', file)
    return this.http.post(`${API_URL}/events/${i7EventId}/images/`, data)
  }

  listEventImages(i7eventId: string): Observable<I7eventImage[]> {
    return this.http.get(`${API_URL}/events/${i7eventId}/images/`).pipe(map((data: any) => data.map(img => new I7eventImage(img))))
  }

  getI7EventImage(eventId: string, photoId: string): Observable<any> {
    return this.http.get(`${API_URL}/events/${eventId}/images/${photoId}`)
  }

  unlikeEventImage(i7eventId: string, id: string) {
    return this.http.post(`${API_URL}/events/${i7eventId}/images/${id}/unlike`, {}).toPromise()
  }

  likeEventImage(i7EventId: string, id: string) {
    return this.http.post(`${API_URL}/events/${i7EventId}/images/${id}/like`, {}).toPromise()
  }

  deleteImage(i7event: string, id: string): Observable<any> {
    return this.http.delete(`${API_URL}/events/${i7event}/images/${id}`)
  }
}
