import {Component, OnInit} from '@angular/core'
import {I7Event} from '../../../shared/models/i7event'
import {I7EventService} from '../../../services/i7event.service'
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
  i7events: I7Event[]

  constructor(
    private eventService: I7EventService,
    private router: Router,
    public userService: UserService) {
  }

  ngOnInit() {
    this.eventService
      .getAll()
      .subscribe(
        (data: I7Event[]) => {
          this.i7events = data
            .filter(el => el.image_normal != null)
            .sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime())
        }
      )
  }

  goToDetails(event: I7Event) {
    this.router.navigate([`/events/${event.id}`])
  }

}
