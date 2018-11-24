import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UserService } from '../../../../services/user.service'
import { User } from '../../../../shared/models/user'
import { I7Event } from '../../../../shared/models/i7event'
import { I7EventService } from '../../../../services/i7event.service'
import { Location } from '@angular/common'
import { RelationStatus } from '../../../../shared/enums'

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User
  sharedEvents: I7Event[]

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private eventService: I7EventService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (!params['id']) {
        return
      }

      this.userService.getCurrentUser().subscribe(user => {
        if (params['id'] === user.id) {
          this.router.navigateByUrl('settings')
        }
      })

      this.userService.
      getUser(params['id']).
      subscribe(user => {
        this.user = user
        console.log(this.user)
      })
    })
    this.eventService.getAll().subscribe(data => {
      this.sharedEvents = data.filter(x => x.image_medium != null).slice(0, 4)
    })
  }

  sendFriendRequest = () => {
    this.userService.sendFriendRequest(this.user.username).subscribe()
  }

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
      return this.sendFriendRequest
    }
  }
}

