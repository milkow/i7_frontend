import {Component, OnDestroy, OnInit} from '@angular/core'
import {AuthorizationService} from '../../../../services/authorization.service'
import {UserNotificationsService} from '../../../../services/user-notifications.service'
import {Subscription} from 'rxjs'
import {SearchBarService} from '../../../../services/search-bar.service'
import {Router} from '@angular/router'


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
    private searchBarService: SearchBarService,
    private router: Router,
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

  toggleSearchBar() {
    this.searchBarService.visible ? this.searchBarService.hide() : this.searchBarService.show()
  }

  goToDashboard() {
    this.router.navigate(['/dashboard'])
  }

  routeTo = (commands: any[], extras?) => {
    this.searchBarService.hide()
    this.router.navigate(commands, extras)
  }
}
