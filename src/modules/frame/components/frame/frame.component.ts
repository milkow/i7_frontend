import {Component, OnDestroy, OnInit} from '@angular/core'
import {UserNotificationsService} from '../../../../services/user-notifications.service'
import { UserService } from '../../../../services/user.service'

@Component({
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit, OnDestroy {

  constructor(
    private userNotifications: UserNotificationsService,
    private userService: UserService) {}

  ngOnInit() {
    this.userNotifications.startListening()
    this.userNotifications.count()
    this.userService.getCurrentUser().subscribe()
  }

  ngOnDestroy() {
    this.userNotifications.stopListening()
    this.userService.clearData()
  }

}
