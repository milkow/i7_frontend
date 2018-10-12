import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core'
import { User } from '../../../../shared/models/user'
import { AuthenticatedWebsocket } from '../../../utils/authenticated-websocket'
import { environment } from '../../../../environments/environment'
import { WebsocketTokenService } from '../../../../services/websocket-token.service'

const wsUrl = environment.wsUrl

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() onUserAdd: EventEmitter<User> = new EventEmitter()
  searchResult: User[] = []
  searchText: string
  usersWebsocket: AuthenticatedWebsocket


  constructor(
    private websocketService: WebsocketTokenService
  ) { }

  onMessage = (data) => {
    this.searchResult = [...data.result.strangers, ...data.result.friends]
  }

  ngOnInit() {
   this.usersWebsocket = new AuthenticatedWebsocket(`${wsUrl}/users/`, {}, this.onMessage, this.websocketService)
  }

  ngOnDestroy() {
   this.usersWebsocket.close()
  }

  onChangeSearchInput(value: string) {
    this.usersWebsocket.send({username: value})
  }

  emitEvent(user: User) {
    this.onUserAdd.emit(user)
  }

}
