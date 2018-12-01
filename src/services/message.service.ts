import { Injectable } from '@angular/core'
import { environment } from '../environments/environment'
import { Observable, Subject, forkJoin } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Message } from '../shared/models/message'
import { map, tap } from 'rxjs/operators'
import { I7EventWebsocketMessage, I7EventMessageType, I7EventMessageWebsocket } from '../modules/utils/websockets/event-message'
import { WebsocketTokenService } from './websocket-token.service'

const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private ws: I7EventMessageWebsocket
  private messageSource: Subject<any>
  private eventMessages: Message[] = []
  private messageDetails: Message

  constructor(
    private http: HttpClient,
    private tokenIssuer: WebsocketTokenService
  ) { this.messageSource = new Subject()}

  private onWebsocketMessage = (result: I7EventWebsocketMessage) => {
    switch (result.type) {
      case I7EventMessageType.newMessage:
        this.handleNewMessage(new Message(result.data))
        break
      case I7EventMessageType.updatedMessage:
        this.eventMessages.map(x => { if (x.id === result.data.id) {return result}})
        break
      case I7EventMessageType.deletedMessage:
        this.eventMessages.find(x => x.id === result.data.id).removed = true
        break
      case I7EventMessageType.messageLikeUpdated:
        this.eventMessages.find(x => x.id === result.data.i7event_message_id).likes = result.data.likes_count
        break
      default:
        console.warn(`Received data with type ${result.type} on I7EventWebsocket. This type have no handler.`)
    }
    return this.messageSource.next(this.eventMessages)
  }

  handleNewMessage = (message: Message) => {
    if (this.messageDetails && message.in_response_to === this.messageDetails.id ||
      (!this.messageDetails && message.in_response_to === null)) {
      return this.eventMessages.push(message)
    }

    this.eventMessages.find(x => x.id === message.in_response_to).replies_count++
  }

  startListening = (i7EventId: string) => {
    this.messageDetails = null
    this.eventMessages = []
    if (this.ws) {
      this.ws.close()
    }
    this.ws = new I7EventMessageWebsocket(this.onWebsocketMessage, this.tokenIssuer, i7EventId)
  }

  stopListening = () => {
    this.ws.close()
    this.ws = null
  }

  public getMessage(i7EventId: string, messageId: string): Observable<Message> {
    return this.http.get(`${API_URL}/events/${i7EventId}/messages/${messageId}`).pipe(
      map(msg => new Message(msg)),
      tap(msg => this.messageDetails = msg))
  }

  public getResponses(i7EventId: string, messageId: string): Observable<Message[]> {
    let params = new HttpParams()
    params = params.append('in_response_to', messageId)

    return this.http.get(`${API_URL}/events/${i7EventId}/messages/`, { params: params})
      .pipe(map((data: Message[]) => data.map(msg => new Message(msg))))
  }

  public getMessageWithResponses = (i7EventId: string, messageId: string): Observable<Message[]> => {
    forkJoin(
      this.getMessage(i7EventId, messageId),
      this.getResponses(i7EventId, messageId))
      .subscribe(result => {
        this.messageDetails = new Message(result[0])
        this.eventMessages = [result[0], ...result[1]]
        this.messageSource.next(this.eventMessages)
      })

    return this.messageSource.asObservable()
  }

  public sendMessage(message: Message): Observable<any> {
    const body = {
      in_response_to: message.in_response_to,
      body: message.body
    }

    this.http.post(`${API_URL}/events/${message.i7event}/messages/`, body)
    .subscribe(() => this.messageSource.next(this.eventMessages))

    return this.messageSource.asObservable()
  }

  public deleteMessage(message: Message): Observable<any> {
    this.http.delete(`${API_URL}/events/${message.i7event}/messages/${message.id}`).subscribe(
      () => this.messageSource.next(this.eventMessages))

    return this.messageSource.asObservable()
  }

  public getEventMessages(id: string): Observable<any> {
    this.http.get(`${API_URL}/events/${id}/messages`)
    .subscribe(data => {
      this.eventMessages = data as any
      this.messageSource.next(this.eventMessages)
    })

    return this.messageSource.asObservable()
  }

  public handleMessageLike = (message: Message) => {
    if (message.removed) {
      return
    }

    message.likes++
    message.my_like = true
    this.like(message.i7event, message.id).subscribe(
      () => this.messageSource.next(this.eventMessages),
      () => { message.likes--; message.my_like = false})
  }

  public handleMessageUnlike = (message: Message) => {
    message.likes--
    message.my_like = false
    this.unlike(message.i7event, message.id).subscribe(
      () => this.messageSource.next(this.eventMessages),
      () => { message.likes++; message.my_like = true})
  }

  public like = (i7eventId: string, messageId: string) => {
    return this.http.post(`${API_URL}/events/${i7eventId}/messages/${messageId}/like`, {i7event_pk: i7eventId, id: messageId})
  }

  public unlike = (i7eventId: string, messageId: string) => {
    return this.http.post(`${API_URL}/events/${i7eventId}/messages/${messageId}/unlike`, {i7event_pk: i7eventId, id: messageId})
  }
}
