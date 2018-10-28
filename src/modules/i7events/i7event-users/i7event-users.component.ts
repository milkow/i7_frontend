import { Component, OnInit } from '@angular/core'
import { User } from '../../../shared/models/user'
import { I7EventService } from '../../../services/i7event.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-event-users',
  templateUrl: './i7event-users.component.html',
  styleUrls: ['./i7event-users.component.css']
})
export class I7EventUsersComponent implements OnInit {
  participants: User[] = []
  constructor(private eventService: I7EventService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.eventService
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
