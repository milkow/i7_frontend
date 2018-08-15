import { Injectable } from '@angular/core'
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http'
import { Router } from '@angular/router'
import { Observable, throwError } from 'rxjs'
import { tap, finalize, switchMap, catchError, map, } from 'rxjs/operators'
import { AuthorizationService, IToken } from './authorization.service'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    isRefreshingToken = false

    constructor(public auth: AuthorizationService, public router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.auth.getToken()
        if (token) {
            request = this.addToken(request, token.access_token)
        }
        return next.handle(request).pipe(
            catchError((err: any) => {
                if (err.status === 401) {
                    return this.handle401Error(request, next)
                }
                return throwError(err)
            }))
    }

    private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    }

    private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        if (this.isRefreshingToken) {
            return
        }
        this.isRefreshingToken = true

        return this.auth.refreshToken().pipe(switchMap((newToken: IToken) => {
            if (newToken) {
                this.auth.storeToken(newToken)
                return next.handle(this.addToken(req, newToken.access_token))
            }
            this.router.navigate(['/account/log-in'])
        }
        ), catchError((err) => {
            this.router.navigate(['/account/log-in'])
            return throwError('')
        }))
    }
}
