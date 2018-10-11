import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { User } from '../../../../shared/models/user'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  @Input() users: User[] = []
  @Input() text: string
  @Input() color: string
  @Output() onButtonClick: EventEmitter<User> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  emit(user: User) {
    this.onButtonClick.emit(user)
  }
}
