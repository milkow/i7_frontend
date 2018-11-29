import { Component, OnInit, OnDestroy } from '@angular/core'
import { WebsocketTokenService } from '../../../../services/websocket-token.service'
import { UserSearchResponse, UserSearchWebsocket } from '../../../utils/websockets/user-search'
import { User } from '../../../../shared/models/user';
import { MessageTypes } from '../../../utils/websockets/message-types';
import { I7Event } from '../../../../shared/models/i7event';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-searchbar-mobile',
  templateUrl: './searchbar-mobile.component.html',
  styleUrls: ['./searchbar-mobile.component.scss']
})
export class SearchbarMobileComponent implements OnInit, OnDestroy {
  search = ''
  usersWebsocket: UserSearchWebsocket
  messageTimeoutID: number
  usersFriends: User[] = []
  usersStrangers: User[] = []
  privateI7Events: I7Event[] = []
  publicI7Events: I7Event[] = []

  constructor(
    private websocketService: WebsocketTokenService,
    private router: Router
  ) { }

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

  ngOnInit() {
    this.usersWebsocket = new UserSearchWebsocket(this.onMessage, this.websocketService)
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.search = ''
      }
    })
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

  ngOnDestroy() {
   this.usersWebsocket.close()
  }
}
