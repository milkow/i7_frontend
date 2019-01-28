import {Component, OnInit} from '@angular/core'
import {I7Event} from '../../../shared/models/i7event'
import {I7EventService} from '../../../services/i7event.service'
import {Router} from '@angular/router'
import {UserService} from '../../../services/user.service'
import {User} from '../../../shared/models/user'
import { UtilsService } from '../../../services/utils.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loaded = false
  currentUser: User
  page = 1
  i7events: I7Event[]
  likedI7Events: I7Event[] = []
  finished: boolean

  constructor(
    private eventService: I7EventService,
    private router: Router,
    public utilsService: UtilsService,
    public userService: UserService) {
  }

  ngOnInit() {
    this.eventService
      .list({page: String(this.page++), page_size: '10'})
      .subscribe((data: I7Event[]) => {
        this.i7events = data
      },
      () => {},
      () => this.loaded = true)
    this.eventService.getLikedEvents(1, 6).subscribe(data => this.likedI7Events = data)
  }

  goToDetails(event: I7Event) {
    this.router.navigate([`/events/${event.id}`])
  }

  onScroll() {
    if (this.finished) {
      return
    }

    this.loaded = false
    this.eventService.list({page: String(this.page++), page_size: '10'})
      .subscribe(data => {
        this.i7events = this.i7events.concat(data)
        this.loaded = true
      },
      () => this.finished = true)
  }
}
