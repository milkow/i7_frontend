import { Component, OnInit } from '@angular/core'
import { UserService } from '../../../../services/user.service'
import { FriendRequest } from '../../../../shared/models/friend-request'
import { RelationStatus } from '../../../../shared/enums'
import { Router } from '@angular/router';

@Component({
  selector: 'app-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrls: ['./friend-requests.component.css']
})
export class FriendRequestsComponent implements OnInit {
  relationStatus = RelationStatus
  requests: FriendRequest[] = []
  userInvitations: FriendRequest[] = []
  constructor(
    private userService: UserService,
    private router: Router) {}

  ngOnInit() {
    this.userService.getFriendRequests().subscribe(requests => this.requests = requests)
    this.userService.getPendingRequests().subscribe(requests =>  this.userInvitations = requests)
  }

  accept(request: FriendRequest) {
    this.userService.acceptFriendRequest(request.id).subscribe(() => this.ngOnInit())
  }

  remove(request: FriendRequest) {
    this.userService.deleteFriendRequest(request.id).subscribe(() => this.ngOnInit())
  }

  goToFriends() {
    this.router.navigate(['/friends'])
  }
}
