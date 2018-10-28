import { Injectable } from '@angular/core'
import { environment } from '../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { RestorePassword } from '../shared/models/restore-password'
import { User } from '../shared/models/user'
import { map } from 'rxjs/operators'

const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class PasswordRestorationService {
  user: User

  constructor(private http: HttpClient) { }

  getUser(): Observable<User> {
    return of(this.user)
  }

  restoreCreate(email: string): Observable<any> {
    return this.http.post(`${API_URL}/account/password-restorations/`, {email: email })
  }

  restoreRead(key: string): Observable<any> {
    return this.http.get(`${API_URL}/account/password-restorations/${key}`).pipe(
      map(user => (this.user as any) = user)
    )
  }

  restore(key: string, restorePassword: RestorePassword): Observable<any> {
    return this.http.post(`${API_URL}/account/password-restorations/${key}/restore`, restorePassword)
  }
}
