import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Happening } from '../../shared/models/Happening'
import { Headers } from '@angular/http'

const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient
  ) { }

  public getHappenings() {
    let headers = new HttpHeaders()
    headers = headers.append('Content-Type', 'application/json')
    headers = headers.append('Authorization', 'Basic ' + btoa('admin:admin123'))
    headers = headers.append('dupa', '12312312')

    return this.http.get(API_URL + '/happenings/', {headers: headers})
}

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error)
    return Observable.throw(error)
  }

}
