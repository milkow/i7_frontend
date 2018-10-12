import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../environments/environment'
import { map } from 'rxjs/operators'

const API_URL = environment.apiUrl
export interface ITokenIssuer {
    issue: () => Promise<any>
}

@Injectable({
    providedIn: 'root'
})
export class WebsocketTokenService {
    token: string

    constructor(
        private http: HttpClient
    ) {
    }

    issue = () => {
        return this.getToken()
    }

    getToken() {
        return this.http.post(`${API_URL}/ws-tokens/`, {}).pipe(map((data: any) => data.token)).toPromise()
    }
}
