import { Component, OnInit, Input } from '@angular/core';
import { I7Event } from '../../../../shared/models/i7event';
import { SearchBarService, SearchMode } from '../../../../services/search-bar.service';
import { User } from '../../../../shared/models/user';
import { I7EventService } from '../../../../services/i7event.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  searchMode = SearchMode
  @Input() publicI7Events: I7Event[] = []
  @Input() privateI7Events: I7Event[] = []
  @Input() usersFriends: I7Event[] = []
  @Input() usersStrangers: I7Event[] = []

  constructor(
    public searchBarService: SearchBarService,
    private i7EventService: I7EventService) { }

  ngOnInit() {
  }

  inviteFriend = (user: User) => {
    this.i7EventService
    .addUser(this.searchBarService.options.eventId, user.username)
    .subscribe(
      () => { this.usersFriends = this.usersFriends.filter(x => x.id !== user.id)},
      err => console.log(err)
    )
  }
}
