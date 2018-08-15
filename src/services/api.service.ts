import { Injectable } from '@angular/core'
import { environment } from '../environments/environment'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

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

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error)
    return Observable.throw(error)
  }

}
