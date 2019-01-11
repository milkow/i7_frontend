import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UserService } from '../../../../services/user.service'
import { User } from '../../../../shared/models/user'
import { I7Event } from '../../../../shared/models/i7event'
import { I7EventService } from '../../../../services/i7event.service'
import { RelationStatus } from '../../../../shared/enums'
import { pipe } from 'rxjs'

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User
  sharedEvents: I7Event[]
  eventsOrganizedByUser: I7Event[]

  constructor(
    private userService: UserService,
    private eventService: I7EventService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(this.handleRouteParams)
  }

  handleRouteParams = (params) => {
    if (!params['id']) {
      return
    }

    this.userService.getCurrentUser().subscribe(user => {
      if (params['id'] === user.id) {
        this.router.navigate(['settings'], {replaceUrl: true})
      }
    })

    this.userService
    .getUser(params['id'])
    .subscribe(pipe(this.assignUser, this.getCommonEvents, this.getEventsOrganizedByUser))
  }

  assignUser = (user: User) => this.user = user

  getCommonEvents = () => this.eventService.getCommonEvents(this.user.id).subscribe(events => this.sharedEvents = events.slice(0, 4))

  getEventsOrganizedByUser = () => this.eventService.getEventsOrganizedByUser(this.user.id)
    .subscribe(events => this.eventsOrganizedByUser = events.slice(0, 4))

  sendFriendRequest = () => this.userService
      .sendFriendRequest(this.user.username)
      .subscribe(() => {
        this.user.relation_status = RelationStatus.sent
      }, err => {
        // popup - request pending
      })

  acceptFriendRequest = () =>
    this.userService
      .getPendingFriendRequest(this.user.id)
      .subscribe(req => console.log(req))

  getFriendStatusLabel = () => {
    switch (this.user.relation_status) {
      case RelationStatus.friend:
        return 'Friends'
      case RelationStatus.stranger:
        return 'Add friend'
      case RelationStatus.sent:
        return 'Request sent'
      case RelationStatus.received:
        return 'Accept'
    }
  }

  getFriendStatusClickHandler = () => {
    if (this.user.relation_status === RelationStatus.stranger) {
      return this.sendFriendRequest()
    }
    if (this.user.relation_status === RelationStatus.received) {
      return this.acceptFriendRequest()
    }
  }

  getImageStyle = (event: I7Event) => ({
    'background-image': `url('${event.image_medium}')`
  })
}

