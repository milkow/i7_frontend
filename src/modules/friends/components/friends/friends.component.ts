import {Component, OnInit} from '@angular/core'
import { UserService } from '../../../../services/user.service'
import { User } from '../../../../shared/models/user'
import { FriendRequest } from '../../../../shared/models/friend-request'
import { RelationStatus } from '../../../../shared/enums'

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
})
export class FriendsComponent implements OnInit {
  toggle = false
  friends: User[] = []
  friendRequests: FriendRequest[] = []

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getFriends().subscribe(friends => this.friends = friends)
    this.userService.getFriendRequests().subscribe(requests => this.friendRequests = requests)
  }

  getRelation() {
    return this.toggle ? RelationStatus.received : RelationStatus.friend
  }
}
