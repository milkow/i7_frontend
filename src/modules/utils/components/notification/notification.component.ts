import { Component, OnInit, Input } from '@angular/core'
import { Notification, NotificationType } from '../../../../shared/models/notification'
import { NotificationService } from '../../../../services/notification.service'

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = []

  @Input() text: string
  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService
      .getNotifications()
      .subscribe(data =>
        this.notifications = data)
  }

  getClass(notification: Notification) {
    switch (notification.type) {
      case NotificationType.Success:
        return 'success'
        case NotificationType.Info:
        return 'info'
        case NotificationType.Error:
        return 'error'
    }
  }

  destroy() {
   this.notificationService.pop()
  }
}
