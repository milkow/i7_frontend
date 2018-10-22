import {Component, OnInit} from '@angular/core'
import {Happening} from '../../../shared/models/happening'
import {HappeningService} from '../../../services/happening.service'
import {Router} from '@angular/router'
import {NotificationService} from '../../../services/notification.service'
import {UserService} from '../../../services/user.service'
import {User} from '../../../shared/models/user'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  currentUser: User
  happenings: Happening[]

  constructor(
    private happeningService: HappeningService,
    private router: Router,
    private notificationService: NotificationService,
    public userService: UserService) {
  }

  ngOnInit() {
    this.happeningService
      .getHappenings()
      .subscribe(
        (data: Happening[]) => {
          this.happenings = data
            .filter(el => el.image_normal != null)
            .map(h => new Happening(h))
            .sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime())
        }
      )
  }

  goToDetails(happening: Happening) {
    this.router.navigate([`/events/${happening.id}`])
  }

  gotoUserProfile(id: string) {
    this.router.navigate([`/users/${id}`])
  }
}
