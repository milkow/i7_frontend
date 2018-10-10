import { Component, OnInit } from '@angular/core'
import { UserService } from '../../../../services/user.service'
import { User } from '../../../../shared/models/user'

@Component({
  selector: 'app-friends-bar',
  templateUrl: './friends-bar.component.html',
  styleUrls: ['./friends-bar.component.css']
})
export class FriendsBarComponent implements OnInit {
  friends: User[] = []
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getFriends()
      .subscribe(friends => this.friends = friends)
  }
}
