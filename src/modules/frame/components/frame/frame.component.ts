import {Component, OnDestroy, OnInit, ElementRef} from '@angular/core'
import {UserNotificationsService} from '../../../../services/user-notifications.service'
import { UserService } from '../../../../services/user.service'
import { SearchBarService } from '../../../../services/search-bar.service';

@Component({
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit, OnDestroy {

  constructor(
    private userNotifications: UserNotificationsService,
    private userService: UserService,
    public searchBarService: SearchBarService,
    private host: ElementRef) {}

  ngOnInit() {
    this.userNotifications.startListening()
    this.userNotifications.count()
    this.userService.getCurrentUser().subscribe()
  }

  ngOnDestroy() {
    this.userNotifications.stopListening()
    this.userService.clearData()
  }

  getDesktopSearchBarVisibility() {
    if (!this.searchBarService.getVisible()) {
      return false
    }

    if (this.host.nativeElement.offsetWidth < 992) {
      return false
    }

    return true
  }

}
