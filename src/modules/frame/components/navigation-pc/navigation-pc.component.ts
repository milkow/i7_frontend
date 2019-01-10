import {Component, OnDestroy, OnInit} from '@angular/core'
import {AuthorizationService} from '../../../../services/authorization.service'
import {UserNotificationsService} from '../../../../services/user-notifications.service'
import {Subscription} from 'rxjs'
import { SearchBarService } from '../../../../services/search-bar.service';


@Component({
  selector: 'app-frame-navigation-pc',
  templateUrl: 'navigation-pc.component.html',
  styleUrls: ['navigation-pc.component.scss'],
})
export class NavigationPcComponent implements OnInit, OnDestroy {

  public userNotificationsCount = ''

  constructor(
    private authorizationService: AuthorizationService,
    private userNotifications: UserNotificationsService,
    private searchBarService: SearchBarService
  ) {
  }

  private countSubscription: Subscription

  ngOnInit() {
    this.countSubscription = this.userNotifications
      .countObservable()
      .subscribe(this.userNotificationsCountReceived)
  }

  ngOnDestroy() {
    this.countSubscription.unsubscribe()
  }

  userNotificationsCountReceived = (count: number) => {
    if (count === 0) {
      this.userNotificationsCount = ''
      return
    }
    this.userNotificationsCount = `${count}`
  }

  logout() {
    this.authorizationService
      .logout()
      .subscribe(() => this.authorizationService.logoutConfirm())
  }

  toggleSearchBar() {
    this.searchBarService.toggleVisible()
  }
}
