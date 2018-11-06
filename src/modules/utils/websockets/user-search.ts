import {AuthenticatedWebsocket} from '../authenticated-websocket'
import {User} from '../../../shared/models/user'
import {environment} from '../../../environments/environment'
import {ITokenIssuer} from '../../../services/websocket-token.service'
import {MessageTypes} from './message-types'
import { I7Event } from '../../../shared/models/i7event';

export class UserSearchResponse {
  request_id: number
  type: MessageTypes
  data: User[] | I7Event[]
}

export class UserSearchWebsocket {
  private path = '/search/'
  private ws: AuthenticatedWebsocket
  private lastMessageID: number
  private onMessage: (_: UserSearchResponse) => void
  private ignoreMissedMessages = true

  constructor(onMessage: (_: UserSearchResponse) => void, tokenIssuer: ITokenIssuer) {
    const url = `${environment.wsUrl}${this.path}`
    this.onMessage = onMessage
    this.ws = new AuthenticatedWebsocket(url, {}, this.receive, tokenIssuer)
  }

  send = (searchTerm: string): number => {
    this.lastMessageID = Math.floor(Math.random() * 2147483647) + 1
    this.ws.try_send({
      id: this.lastMessageID,
      search_term: searchTerm
    })
    return this.lastMessageID
  }

  receive = (rawMessage: any) => {
    if (rawMessage.hasOwnProperty('error')) {
      console.warn(`User Search Websocket receive an error: ${rawMessage}`)
      return
    }

    const msg: UserSearchResponse = rawMessage.result

    if (msg.request_id && msg.request_id !== this.lastMessageID && this.ignoreMissedMessages) {
      console.log(`User Search Websocket received stale message. ` +
        `Last message ID: ${this.lastMessageID}, received: ${msg.request_id}. Ignored.`)
      return
    }

    this.onMessage(msg)
  }

  close = () => {
    console.log('User close')
    this.ws.close()
  }

}
