import { Injectable } from '@angular/core'
import { environment } from '../environments/environment'
import { Observable, throwError, Subject, ReplaySubject } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
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

  public sendMessage(message: Message): Observable<any> {
    const body = {
      in_response_to: message.in_response_to,
      body: message.body
    }

    this.http.post(`${API_URL}/events/${message.event}/messages/`, body)
    .subscribe(() => this.getEventMessages(message.event))

    return this.messageSource.asObservable()
  }

  public deleteMessage(message: Message): Observable<any> {
    this.http.delete(`${API_URL}/events/${message.event}/messages/${message.id}`).subscribe(
      () => this.getEventMessages(message.event))

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

  private handleError<T> (operation = 'operation') {
    return (error: any): Observable<T> => {
      console.log(error)
      console.log(`${operation} failed: ${error.message}`)
      return throwError(error.error)
    }
  }
}
