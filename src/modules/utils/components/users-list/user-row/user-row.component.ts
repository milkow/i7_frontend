import { Component, OnInit, Input } from '@angular/core'
import { User } from '../../../../../shared/models/user'
import { Router } from '@angular/router'
import { RelationStatus } from '../../../../../shared/enums'
import { UserService } from '../../../../../services/user.service'
import { FriendRequest } from '../../../../../shared/models/friend-request'

@Component({
  selector: 'app-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.css']
})
export class UserRowComponent implements OnInit {
  public relationStatus = RelationStatus
  @Input() user: User
  @Input() text: string
  @Input() showMenu?: boolean
  @Input() relation?: RelationStatus
  @Input() friendRequest?: FriendRequest
  constructor(
    private router: Router,
    private userService: UserService) { }


  ngOnInit() {
  }

  gotoUserProfile(id: string) {
    this.router.navigate([`/users/${id}`])
  }

  getButtonVisibility() {
    if (this.relation === RelationStatus.friend) {
      return false
    }

    return true
  }

  getButtonText() {
    switch (this.relation) {
      case RelationStatus.received:
        return 'Accept'
      default:
        return ''
    }
  }

  getButtonClickHandler() {
    switch (this.relation) {
      case RelationStatus.received:
        return this.acceptFriendRequest()
      default:
        return null
    }
  }

  acceptFriendRequest = () => {
    this.userService.acceptFriendRequest(this.friendRequest.id)
  }

  rejectFriendRequest = () => {
    this.userService.deleteFriendRequest(this.friendRequest.id)
  }

  removeFriend = () => {
    this.userService.deleteFriend(this.user.username)
  }
}
