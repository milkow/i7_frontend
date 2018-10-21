import { objectToQuery } from '../../constrib/url_utils'
import { ITokenIssuer } from '../../services/websocket-token.service'

export class AuthenticatedWebsocket {
    permClosed = false
    isConnected = false
    socket = null
    partial = ''
    reconnectionTries = 0
    url: any
    onMessage: any
    tokenIssuer: ITokenIssuer
    queryParams: any;

    constructor(url: string, queryParams: any, onMessage: (jsonData: object) => void, issuer: ITokenIssuer) {
        this.url = url
        this.onMessage = onMessage
        this.tokenIssuer = issuer
        this.queryParams = queryParams
        this.connect()
    }

    send = (data) => {
        const msg = JSON.stringify(data)
        this.socket.send(msg)
    }

    try_send = (data) => {
        if (this.isConnected) {
            this.send(data)
        } else {
            setTimeout(() => { this.try_send(data) }, 300)
        }
    }

    close = () => {
        this.socket.close()
        this.isConnected = false
        this.permClosed = true
        this.partial = ''
        this.reconnectionTries = 0
    }

     connect = async () => {
        this.reconnectionTries += 1
        if (this.socket !== null) {
            this.socket.close()
        }
        const token: any = await this.tokenIssuer.issue()
        const params = {...this.queryParams, token: token}
        const queryPart = objectToQuery(params)
        const url = `${this.url}${queryPart}`


        this.socket = new WebSocket(url)
        this.socket.onopen = this.onopen
        this.socket.onmessage = this.onmessage
        this.socket.onclose = this.onclose
    }

    onopen = (event) => {
        this.isConnected = true
        this.reconnectionTries = 0
    }

    onmessage = (event) => {
        try {
            const data = JSON.parse(this.partial + event.data)
            this.partial = ''
            this.onMessage(data)
        } catch (err) {
            this.partial += event.data
        }
    }

    onclose = () => {
        this.socket = null
        this.isConnected = false
        if (!this.permClosed) {
            this.reconnect()
        }
    }

    reconnect = () => {
        const timeout = Math.pow(2, this.reconnectionTries) / 2
        setTimeout(this.connect, timeout)
    }
}
