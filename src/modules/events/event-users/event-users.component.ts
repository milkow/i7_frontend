import { Component, OnInit } from '@angular/core'
import { User } from '../../../shared/models/user'
import { HappeningService } from '../../../services/happening.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-event-users',
  templateUrl: './event-users.component.html',
  styleUrls: ['./event-users.component.css']
})
export class EventUsersComponent implements OnInit {
  participants: User[] = []
  constructor(private happeningService: HappeningService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.happeningService
      .getParticipants(params['id'])
      .subscribe(data =>
      this.participants = data)
    })
  }

  remove(user: User) {
    console.log(`removing ${user.username}`)
  }

  add(user: User) {
    console.log(`adding ${user.username}`)
  }
}
