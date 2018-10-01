import { Injectable } from '@angular/core'
import { environment } from '../environments/environment'
import { Observable, throwError } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Happening } from '../shared/models/happening'
import { tap, catchError } from 'rxjs/operators'

const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class HappeningService {
  constructor(
    private http: HttpClient
  ) { }

  public getHappenings(): Observable<any> {
    return this.http.get(API_URL + '/happenings/')
  }

  public getHappening(id: string): Observable<any> {
    return this.http.get(`${API_URL}/happenings/${id}`)
  }

  public createHappening(happening: Happening): Observable<Happening> {

    (happening as any).geo_coordinates = `POINT(${happening.coordinates.latitude} ${happening.coordinates.longtitude})`

    return this.http.post<Happening>(API_URL + '/happenings/create', happening).pipe(
      catchError(this.handleError<Happening>('create Happening'))
    )
  }

  public publishHappening(id: string, image: File): Observable<any> {
    const data = new FormData()
    data.append('image_normal', image)

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
