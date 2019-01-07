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
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  currentUser: User
  i7events: I7Event[]
  likedI7Events: I7Event[] = []

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
    this.eventService.getLikedEvents(1, 6).subscribe(data => this.likedI7Events = data)
  }

  goToDetails(event: I7Event) {
    this.router.navigate([`/events/${event.id}`])
  }

  getTimeDiffFormatted(event: I7Event): string {
    const startDate = new Date(event.start).getTime()
    const now = new Date().getTime()
    let delta = Math.abs(startDate - now) / 1000


    const days = Math.floor(delta / 86400)
    delta -= days * 86400

    if (startDate < now) {
      return `${days} days ago`
    }

    const hours = Math.floor(delta / 3600) % 24
    delta -= hours * 3600

    return `in ${days} days and ${hours} hours`
  }

}
