import {Component, NgZone, OnInit} from '@angular/core'
import {UserNotification, UserNotificationType} from '../../../shared/models/user-notification'
import {UserNotificationsService} from '../../../services/user-notifications.service'

export class Notif {
  id: number
  date: number
  avatar: string
  title: string
  content: string
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  public UserNotificationTypes = UserNotificationType
  public hasError = false
  public isLoaded: boolean
  public userNotificationsList: UserNotification[] = []
  public types = UserNotificationType

  constructor(
    private userNotifications: UserNotificationsService,
    private zone: NgZone,
  ) {
  }

  ngOnInit() {
    this.isLoaded = false
    this.userNotifications
      .list()
      .subscribe(this.onUserNotificationsListReceive, this.errorOnLoad)
  }

  private onUserNotificationsListReceive = (ls: UserNotification[]) => {
    this.zone.run(() => {
      this.assignNotifications(ls)
      this.userNotifications.markAsSeenAll()
      this.markAsLoaded()
    })
  }

  private assignNotifications = (ns: UserNotification[]) => {
    this.userNotificationsList = ns
  }

  private errorOnLoad = () => {
    this.hasError = true
    this.markAsLoaded()
  }

  private markAsLoaded = () => {
    this.isLoaded = true
  }

}
