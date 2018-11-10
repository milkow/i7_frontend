import {Component, OnDestroy, OnInit} from '@angular/core'
import {UserNotificationsService} from '../../../../services/user-notifications.service'
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-searchbar-mobile',
  templateUrl: './searchbar-mobile.component.html',
  styleUrls: ['./searchbar-mobile.component.scss']
})
export class SearchbarMobileComponent implements OnInit, OnDestroy {

  public userNotificationsCount = ''

  constructor(
    private userNotifications: UserNotificationsService,
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


}
