import {Component, OnInit} from '@angular/core'
import { UserService } from '../../../services/user.service'
import { User } from '../../../shared/models/user'

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
})
export class FriendsComponent implements OnInit {
  pumks: User[] = []
  friends: User[] = []
  searchResult: User[] = []
  searchText: string
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getFriends().subscribe(friends => {this.friends = friends})
    this.userService.getUsers().subscribe(users => this.pumks = users)
  }

  add(user: User) {
    this.userService.sendFriendRequest(user.username).subscribe(() => this.ngOnInit())
  }

  remove(user: User) {
    this.userService.deleteFriend(user.username).subscribe(() => this.ngOnInit())
  }

  onChangeSearchInput(value: string) {
    console.log(value)
  }
}
