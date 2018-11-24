import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'
import { AuthorizationService } from './authorization.service'

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthorizationService, public router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isAuthorized()) {
      this.auth.authorize()
      return false
    }
    return true
  }
}
