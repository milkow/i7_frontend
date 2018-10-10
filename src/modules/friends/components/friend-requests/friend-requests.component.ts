import { Component, OnInit } from '@angular/core'
import { UserService } from '../../../../services/user.service'
import { FriendRequest } from '../../../../shared/models/friend-request'

@Component({
  selector: 'app-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrls: ['./friend-requests.component.css']
})
export class FriendRequestsComponent implements OnInit {
  friendRequests: FriendRequest[]
  pendingRequests: FriendRequest[]
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getFriendRequests().subscribe(requests => this.friendRequests = requests)
    this.userService.getPendingRequests().subscribe(requests => {this.pendingRequests = requests})
  }

  accept(request: FriendRequest) {
    this.userService.acceptFriendRequest(request.id).subscribe(() => this.ngOnInit())
  }

  remove(request: FriendRequest) {
    this.userService.deleteFriendRequest(request.id).subscribe(() => this.ngOnInit())
  }
}
