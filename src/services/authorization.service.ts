import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import {NGXLogger} from 'ngx-logger'
import {objectToQuery, queryToObject} from '../constrib/url_utils'
import {environment} from '../environments/environment'
import {Router} from '@angular/router'
import { Observable, of } from 'rxjs'


interface IAuthResponseParams {
  code: string
  state: string
}

export interface IToken {
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
  token_type: string
}

@Injectable()
export class AuthorizationService {

  private token: IToken | null = null

  constructor(
    private http: HttpClient,
    private log: NGXLogger,
    private router: Router
  ) {}

  public goToOAuthInitialView() {
    this.router.navigate(['/account/oauth2/log-in'])
  }

  public authorize() {
    const state = this.generateState()
    this.saveState(state)
    const q = objectToQuery({
      response_type: 'code',
      client_id: environment.oauth_main.client_id,
      redirect_uri: environment.oauth_main.redirect_uri,
      scope: environment.oauth_main.default_scope,
      state: state,
    })
    document.location.href = `${environment.oauth_main.endpoint_authorize}${q}`
  }

  public tokenExchange(callback: () => void) {

    const parsed = this.parseUrlParams()

    const savedState = this.getSavedState()
    if (!this.isStateValid(savedState, parsed.state)) {
      this.log.warn('oauth2 token exchange: validation failed')
      return
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    }

    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', parsed.code)
      .set('redirect_uri', environment.oauth_main.redirect_uri)
      .set('client_id', environment.oauth_main.client_id)

    this.http.post(environment.oauth_main.endpoint_token, body.toString(), httpOptions).subscribe((data: IToken) => {
      this.storeToken(data)
      callback()
    })
  }

  public isAuthorized(): boolean {
    if (!this.getToken()) {
      return false
    }
    return true
  }

  public storeToken(token: IToken) {
    window.localStorage.setItem(environment.oauth_main.token_storage_key, JSON.stringify(token))
    this.token = token
  }

  public getToken(): IToken {
    if (!this.token) {
      this.token = JSON.parse(window.localStorage.getItem(environment.oauth_main.token_storage_key))
    }
    return this.token
  }

  public refreshToken(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    }

     const body = new HttpParams()
     .set('client_id', environment.oauth_main.client_id)
     .set('refresh_token', this.getToken().refresh_token)
     .set('grant_type', 'refresh_token')

     return this.http.post(environment.oauth_main.endpoint_token, body, httpOptions)
  }

  private generateState(): string {
    let a = new Uint8Array(64)
    a = window.crypto.getRandomValues(a) as Uint8Array
    const s = String.fromCharCode.apply(null, a)
    return btoa(s)
  }

  private saveState(state: string) {
    const date = new Date()
    date.setDate(date.getTime() + (5 * 60 * 1000))
    document.cookie = `${environment.oauth_main.state_cookie_name}=${state};expired=${date.toUTCString()};path=/`
  }

  private isStateValid(savedState: string, receivedState: string): boolean {
    this.log.debug('Checking oauth state')

    if (!savedState) {
      this.log.warn('no saved state')
      return false
    }

    if (!receivedState) {
      this.log.warn('no received state')
      return false
    }

    if (savedState !== receivedState) {
      this.log.warn('received state and saved state differ')
    }

    return true
  }

  private getSavedState(): string {
    const name = `${environment.oauth_main.state_cookie_name}=`
    const cookieParts = decodeURIComponent(document.cookie).split(';')
    for (let i = 0; i < cookieParts.length; i += 1) {
      let c = cookieParts[i]
      while (c[0] === ' ') {
        c = c.substr(1)
      }
      if (c.indexOf(name) === 0) {
        return c.substr(name.length, c.length)
      }
    }
    return ''
  }

  private parseUrlParams(): IAuthResponseParams {
    const o = queryToObject(window.location.search)
    return {
      code: o.code,
      state: o.state,
    }
  }

}
