import {Component, OnInit} from '@angular/core'
import { User } from '../../../../shared/models/user'
import { UserService } from '../../../../services/user.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user: User
  selectedFile: File
  friends: User[]
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService
      .getCurrentUser()
      .subscribe(user => {
        this.user = user
      })
    this.userService
      .getFriends()
      .subscribe(friends => {
        this.friends = friends
      })
  }

  onFileChanged(event) {
    this.userService
    .setPicure(event.target.files[0])
    .subscribe((user: User) => {
      this.user.profile_picture_normal = user.profile_picture_normal
    })
  }
}
