import {Component, OnDestroy, OnInit} from '@angular/core'
import {UserNotificationsService} from '../../../../services/user-notifications.service'

@Component({
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit, OnDestroy{

  constructor(private userNotifications: UserNotificationsService) {}

  ngOnInit() {
    this.userNotifications.startListening()
    this.userNotifications.count()
  }

  ngOnDestroy() {
    this.userNotifications.stopListening()
  }

}
