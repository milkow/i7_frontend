import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { User } from '../../../../shared/models/user'
import { Router } from '@angular/router';

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

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  emit(user: User) {
    this.onButtonClick.emit(user)
  }

  gotoUserProfile(id: string) {
    this.router.navigate([`/users/${id}`])
  }

}
