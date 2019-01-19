import { Injectable } from '@angular/core'
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
} from '@angular/common/http'
import { Router } from '@angular/router'
import { Observable, throwError, iif, of, BehaviorSubject } from 'rxjs'
import { switchMap, catchError, map, retryWhen, concatMap, delay, filter, take, } from 'rxjs/operators'
import { AuthorizationService, IToken } from './authorization.service'
import { NotificationService } from './notification.service'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null)
    refreshTokenInProgress = false

    constructor(private notificationService: NotificationService, public auth: AuthorizationService, public router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.auth.getToken()
        if (token) {
            request = this.addToken(request, token.access_token)
        }
        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err.url && err.url.indexOf('o/token') !== -1) {
                    this.router.navigate(['/account/log-in'])
                }

                if (err.status === 401) {
                    return this.handle401Error(request, next)
                }
                if (err.status === 500 || err.status === 0) {
                    return this.handle500Error(request, next)
                    .pipe(retryWhen(errors => errors.pipe(
                        concatMap((e, i) => iif(
                            () => i > 5,
                            throwError(e),
                            of(e).pipe(delay(5000))))))
                )
                }
                return throwError(err)
            }))

    }

    private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    }

    private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        if (this.refreshTokenInProgress) {
            return this.refreshTokenSubject.pipe(
                filter(result => result !== null),
                take(1),
                switchMap(() => next.handle(this.addAuthenticationToken(req))))
        }
        this.refreshTokenInProgress = true

        return this.auth.refreshToken()
            .pipe(switchMap((newToken: IToken) => {
                if (newToken) {
                    this.auth.storeToken(newToken)
                    this.refreshTokenSubject.next(newToken)
                    return next.handle(this.addAuthenticationToken(req))
                }
            }
            ), catchError((err, caught) => {
                this.router.navigate(['/account/log-in'])
                return of(null)
            }))
    }

    private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
        const token = this.auth.getToken()
        if (token) {
            request = this.addToken(request, token.access_token)
        }

        return request
    }

    private handle500Error(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return of(null)
    }
}
