import { Component, OnInit } from '@angular/core'
import { User } from '../../../../shared/models/user'
import { I7EventService } from '../../../../services/i7event.service'
import { ActivatedRoute } from '@angular/router'
import { SearchBarService, SearchMode } from '../../../../services/search-bar.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-event-users',
  templateUrl: './i7event-users.component.html',
  styleUrls: ['./i7event-users.component.css']
})
export class I7EventUsersComponent implements OnInit {
  currentUser: User
  participants: User[] = []
  i7EventId: string
  constructor(
     private eventService: I7EventService,
     private route: ActivatedRoute,
     private searchBarService: SearchBarService,
     private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => this.currentUser = user)
    this.route.params.subscribe(params => {
    this.i7EventId = params['id']
    this.searchBarService.setOptions({ mode: SearchMode.ManageEventUsers, options: [], eventId: this.i7EventId })

      this.eventService
      .getParticipants(this.i7EventId)
      .subscribe(data => this.participants = data)
    })
  }

  refresh = () => this.ngOnInit()

  getUserRowButtonText(user: User) {
    if (this.currentUser && this.currentUser.id === user.id) {
      return 'You'
    }

    return 'Remove'
  }

  getButtonStyle(user: User) {
    if (this.currentUser && this.currentUser.id === user.id) {
      return { 'color': '#548EFF' }
    }

    return { 'color': 'red' }
  }

  removeUser = (user: User) => {
    this.eventService.removeUser(this.i7EventId, user.username).subscribe(this.refresh)
  }
}
