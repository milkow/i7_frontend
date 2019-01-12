import {Component, NgZone, OnInit} from '@angular/core'
import {UserNotification, UserNotificationType} from '../../../shared/models/user-notification'
import {UserNotificationsService} from '../../../services/user-notifications.service'
import { NotificationType } from '../../../shared/models/notification';
import { Router } from '@angular/router';

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
    private router: Router
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

  goToSeeMore(notification: UserNotification) {
    switch (notification.type) {
      case UserNotificationType.friendRequest:
        return this.router.navigate(['/friends/requests'])
      case UserNotificationType.friendRequestAccepted:
        return this.router.navigate([`/users/${notification.initiator.id}`])
      case UserNotificationType.i7event_invitation:
      return this.router.navigate([`/events/${notification.object_id}`])
    }
  }
}
