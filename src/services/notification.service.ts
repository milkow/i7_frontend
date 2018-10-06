import { Injectable } from '@angular/core'
import { of } from 'rxjs'
import { Notification, NotificationType } from '../shared/models/notification'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifications: Notification[] = []
  constructor() {
  }

  public getNotifications() {
    return of(this.notifications)
  }

  public push(notification: Notification) {
    const messages = this.notifications.map(el => el.text)
    if (messages.indexOf(notification.text) === -1) {
      this.notifications.push(notification)
    }
  }

  public pop() {
    this.notifications.pop()
  }
}
