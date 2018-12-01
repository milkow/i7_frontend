import { AuthenticatedWebsocket } from '../authenticated-websocket'
import { environment } from '../../../environments/environment'
import { ITokenIssuer } from '../../../services/websocket-token.service'

export enum I7EventMessageType {
    newMessage = 'i7event.messages.new',
    updatedMessage = 'i7event.messages.updated',
    deletedMessage = 'i7event.messages.deleted',
    messagesList = 'i7event.messages.list',
    messageLikeUpdated = 'i7event.messages.likes_count_updated'
}

export interface I7EventWebsocketMessage {
    type: I7EventMessageType
    data: any
}

export class I7EventMessageWebsocket {
    private path = `/events/`
    private ws: AuthenticatedWebsocket
    private onMessage: (_: I7EventWebsocketMessage) => void

    constructor(onMessage: (_: I7EventWebsocketMessage) => void, tokenIssuer: ITokenIssuer, i7eventId: string) {
        const url = `${environment.wsUrl}${this.path}${i7eventId}/`
        this.onMessage = onMessage
        this.ws = new AuthenticatedWebsocket(url, {}, this.receive, tokenIssuer)
    }

    receive = (rawMessage: any) => {
        const msg: I7EventWebsocketMessage = {
            type: rawMessage.result.type,
            data: rawMessage.result.data
        }
        this.onMessage(msg)
    }

    close = () => {
        this.ws.close()
    }
}
