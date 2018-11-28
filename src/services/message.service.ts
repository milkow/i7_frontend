import { Injectable } from '@angular/core'
import { environment } from '../environments/environment'
import { Observable, throwError, Subject, ReplaySubject } from 'rxjs'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Message } from '../shared/models/message'
import { map } from 'rxjs/operators'

const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSource: Subject<any>
  private eventMessages: Message[] = []

  constructor(
    private http: HttpClient
  ) {
    this.messageSource = new ReplaySubject(1)
  }

  public getMessage(i7EventId: string, messageId: string): Observable<Message> {
    return this.http.get(`${API_URL}/events/${i7EventId}/messages/${messageId}`).pipe(map(msg => msg = new Message(msg)))
  }

  public getResponses(message: Message): Observable<Message[]> {
    let params = new HttpParams()
    params = params.append('in_response_to', message.id)

    return this.http.get(`${API_URL}/events/${message.i7event}/messages/`, { params: params})
      .pipe(map((data: Message[]) => data.map(msg => new Message(msg))))
  }

  public sendMessage(message: Message): Observable<any> {
    const body = {
      in_response_to: message.in_response_to,
      body: message.body
    }

    this.http.post(`${API_URL}/events/${message.i7event}/messages/`, body)
    .subscribe(() => this.getEventMessages(message.i7event))

    return this.messageSource.asObservable()
  }

  public deleteMessage(message: Message): Observable<any> {
    this.http.delete(`${API_URL}/events/${message.i7event}/messages/${message.id}`).subscribe(
      () => this.getEventMessages(message.i7event))

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

  public like(i7eventId: string, messageId: string): Observable<any> {
    return this.http.post(`${API_URL}/events/${i7eventId}/messages/${messageId}/like`, {i7event_pk: i7eventId, id: messageId})
  }

  public unlike(i7eventId: string, messageId: string): Observable<any> {
    return this.http.post(`${API_URL}/events/${i7eventId}/messages/${messageId}/unlike`, {i7event_pk: i7eventId, id: messageId})
  }
}
