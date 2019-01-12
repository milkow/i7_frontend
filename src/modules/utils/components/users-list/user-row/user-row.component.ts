import { Component, OnInit, Input } from '@angular/core'
import { User } from '../../../../../shared/models/user'
import { Router, ActivatedRoute } from '@angular/router'
import { RelationStatus } from '../../../../../shared/enums'
import { UserService } from '../../../../../services/user.service'
import { FriendRequest } from '../../../../../shared/models/friend-request'
import { SearchBarService } from '../../../../../services/search-bar.service';

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
  @Input() showButton?: boolean
  @Input() friendRequest?: FriendRequest
  @Input() buttonClickHandler?: (any) => void
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private searchBarService: SearchBarService) { }


  ngOnInit() {
  }

  gotoUserProfile(id: string) {
    if (this.router.url.indexOf('users') !== -1) {
      this.router.navigate(['/dashboard'])
    }

    this.router.navigate([`/users/${id}`])
    this.searchBarService.hide()
  }

  getButtonStyle() {
    if (this.relation && this.relation === RelationStatus.sent) {
      return { 'color': 'red'}
    }

    return { 'color': '#548EFF'}
  }

  getButtonClickHandler() {
    if (this.buttonClickHandler) {
      return this.buttonClickHandler(this.user)
    }

    switch (this.relation) {
      case RelationStatus.received:
        return this.acceptFriendRequest()
      case RelationStatus.sent:
        return this.removeFriendRequest()
      case RelationStatus.stranger:
       // return this.addFriend()
      default:
        return null
    }
  }

  acceptFriendRequest = () => {
    this.userService.acceptFriendRequest(this.friendRequest.id)
  }

  removeFriendRequest = () => {
    this.userService.deleteFriendRequest(this.friendRequest.id)
  }

  removeFriend = () => {
    this.userService.deleteFriend(this.user.username)
  }
}
