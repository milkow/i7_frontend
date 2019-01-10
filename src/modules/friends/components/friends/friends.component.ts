import {Component, OnInit} from '@angular/core'
import { UserService } from '../../../../services/user.service'
import { User } from '../../../../shared/models/user'
import { FriendRequest } from '../../../../shared/models/friend-request'
import { RelationStatus } from '../../../../shared/enums'
import { Router } from '@angular/router'

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
})
export class FriendsComponent implements OnInit {
  relationStatus = RelationStatus
  friends: User[] = []
  friendRequests: FriendRequest[] = []

  constructor(
    private userService: UserService,
    private router: Router) {}

  ngOnInit() {
    this.userService.getFriends().subscribe(friends => this.friends = friends)
  }

  goToInvitations() {
    this.router.navigate(['friends/requests'])
  }
}
