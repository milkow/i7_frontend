import {AuthenticatedWebsocket} from '../authenticated-websocket'
import {ITokenIssuer} from '../../../services/websocket-token.service'
import {environment} from '../../../environments/environment'
import {UserNotification} from '../../../shared/models/user-notification'

export enum UserNotificationType {
  userNotification = 'user_notification',
  notificationsSeen = 'notifications_seen',
}

export interface UserNotificationMessage {
  type: UserNotificationType
  data: UserNotification | null
}

export class UserNotificationsWebsocket {
  private path = '/notifications/'
  private ws: AuthenticatedWebsocket
  private onMessage: (_: UserNotificationMessage) => void

  constructor(onMessage: (_: UserNotificationMessage) => void, tokenIssuer: ITokenIssuer) {
    const url = `${environment.wsUrl}${this.path}`
    this.onMessage = onMessage
    this.ws = new AuthenticatedWebsocket(url, {}, this.receive, tokenIssuer)
  }

  receive = (rawMessage: any) => {
   const msg: UserNotificationMessage = {
      type: rawMessage.result.type,
      data: rawMessage.result.data
    }
    this.onMessage(msg)
  }

  close = () => {
    this.ws.close()
  }

}
