import {Component, NgZone, OnDestroy, OnInit} from '@angular/core'
import {UserNotificationsService} from '../../../../services/user-notifications.service'
import {UserNotification, UserNotificationType} from '../../../../shared/models/user-notification'
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-notifications-popup',
  templateUrl: './notifications-popup.component.html',
  styleUrls: ['./notifications-popup.component.scss']
})
export class NotificationsPopupComponent implements OnInit, OnDestroy {

  public UserNotificationTypes = UserNotificationType
  public userNotification: UserNotification

  private notificationsSubscriptions: Subscription

  constructor(
    private userNotifications: UserNotificationsService,
    private zone: NgZone,
  ) {
  }

  ngOnInit() {
    this.notificationsSubscriptions = this.userNotifications
      .getNotificationsStream()
      .subscribe(this.setCurrentNotification)
  }

  ngOnDestroy() {
    this.notificationsSubscriptions.unsubscribe()
  }

  onCloseButtonClick = () => {
    this.markAsSeen()
    this.close()
  }

  setCurrentNotification = (n: UserNotification) => {
    this.userNotification = n
  }

  private onButtonClick = () => {
    this.markAsSeen()
    this.close()
  }

  private close = () => {
    this.zone.run(() => {
      this.userNotification = undefined
    })
  }

  markAsSeen = () => {
    this.userNotifications.markAsSeen(this.userNotification.id)
  }

}
