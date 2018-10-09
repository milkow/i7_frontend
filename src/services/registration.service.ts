import {Injectable} from '@angular/core'
import { RegisterAccountUser } from '../shared/models/register-account-user'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from '../environments/environment'

const API_URL = environment.apiUrl

@Injectable()
export class RegistrationService {
  public post_activation: Boolean = false

  constructor(private http: HttpClient) {}
  
  public register(user: RegisterAccountUser): Observable<any> {
    return this.http.post<RegisterAccountUser>(`${API_URL}/account/register`, user)
  }

  public activate(key: string): Observable<any> {
    return this.http.post(`${API_URL}/account/activate`, {key: key})
  }

  activate_post_activation(): void {
    this.post_activation = true
  }

  deactivate_post_activation(): void {
    this.post_activation = false
  }
}
