import {Component} from '@angular/core'
import { AuthorizationService } from '../../../../services/authorization.service';


@Component({
  selector: 'app-frame-navigation-pc',
  templateUrl: 'navigation-pc.component.html',
  styleUrls: ['navigation-pc.component.scss'],
})
export class NavigationPcComponent {

  constructor(private authorizationService: AuthorizationService) {}

  logout() {
    this.authorizationService
    .logout()
    .subscribe(() => this.authorizationService.logoutConfirm())
  }
}
