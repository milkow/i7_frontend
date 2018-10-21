import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core'
import {User} from '../../../../shared/models/user'
import {environment} from '../../../../environments/environment'
import {WebsocketTokenService} from '../../../../services/websocket-token.service'
import {UserSearchResponse, UserSearchWebsocket} from '../../websockets/user-search'
import {MessageTypes} from '../../websockets/message-types'

const wsUrl = environment.wsUrl

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() onUserAdd: EventEmitter<User> = new EventEmitter()
  searchText: string
  usersWebsocket: UserSearchWebsocket

  usersFriends: User[] = []
  usersStrangers: User[] = []

  messageTimeoutID: number

  constructor(
    private websocketService: WebsocketTokenService
  ) { }

  onMessage = (data: UserSearchResponse) => {
    if (data.type === MessageTypes.usersFriends) {
      this.usersFriends = data.data
    }
    if (data.type === MessageTypes.usersStrangers) {
      this.usersStrangers = data.data
    }
  }

  ngOnInit() {
    this.usersWebsocket = new UserSearchWebsocket(this.onMessage, this.websocketService)
  }

  ngOnDestroy() {
   this.usersWebsocket.close()
  }

  onChangeSearchInput(value: string) {
    // Send message after short delay to prevent sending unnecessary message
    // if user is typing fast
    clearTimeout(this.messageTimeoutID)
    this.messageTimeoutID = setTimeout(this.sendSearch(value), 300) as number
  }

  sendSearch = (value: string) => () => {
    this.usersWebsocket.send(value)
  }

  emitEvent(user: User) {
    this.onUserAdd.emit(user)
  }

}
