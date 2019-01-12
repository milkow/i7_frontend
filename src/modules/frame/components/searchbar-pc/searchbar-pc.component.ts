import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { SearchBarService } from '../../../../services/search-bar.service';
import { UserSearchWebsocket, UserSearchResponse } from '../../../utils/websockets/user-search';
import { WebsocketTokenService } from '../../../../services/websocket-token.service';
import { User } from '../../../../shared/models/user';
import { I7Event } from '../../../../shared/models/i7event';
import { MessageTypes } from '../../../utils/websockets/message-types';

@Component({
  selector: 'app-searchbar-pc',
  templateUrl: './searchbar-pc.component.html',
  styleUrls: ['./searchbar-pc.component.scss']
})
export class SearchbarPcComponent implements OnInit, OnDestroy {
  search = ''
  usersWebsocket: UserSearchWebsocket
  messageTimeoutID: number
  usersFriends: User[] = []
  usersStrangers: User[] = []
  privateI7Events: I7Event[] = []
  publicI7Events: I7Event[] = []

  constructor(
    private router: Router,
    private searchBarService: SearchBarService,
    private websocketService: WebsocketTokenService) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.searchBarService.setVisibleSearchBarPC(false)
        this.search = ''
      }
    })

    this.usersWebsocket = new UserSearchWebsocket(this.onMessage, this.websocketService)
  }

  ngOnDestroy() {
    this.usersWebsocket.close()
  }

  onMessage = (data: UserSearchResponse) => {

    switch (data.type) {
      case MessageTypes.usersFriends:
        this.usersFriends = data.data as User[]
        break
      case MessageTypes.usersStrangers:
        this.usersStrangers = data.data as User[]
        break
      case MessageTypes.i7EventsPrivate:
        this.privateI7Events = (data.data as I7Event[]).map(x => new I7Event(x))
        break
      case MessageTypes.i7EventsPublic:
        this.publicI7Events = (data.data as I7Event[]).map(x => new I7Event(x))
        break
    }
    console.log(data)
  }

  onChangeSearchInput(value: string) {
    // Send message after short delay to prevent sending unnecessary message
    // if user is typing fast
    clearTimeout(this.messageTimeoutID)
    this.messageTimeoutID = setTimeout(this.sendSearch(value), 300) as any
  }

  sendSearch = (value: string) => () => {
    this.usersWebsocket.send(value)
  }

  hide() {
    this.searchBarService.setVisibleSearchBarPC(false)
  }
}
