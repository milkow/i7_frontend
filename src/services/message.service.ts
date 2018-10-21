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
  private happeningMessages: Message[] = []

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

    this.http.post(`${API_URL}/happenings/${message.happening}/messages/`, body)
    .subscribe(() => this.getHappeningMessages(message.happening))

    return this.messageSource.asObservable()
  }

  public deleteMessage(message: Message): Observable<any> {
    this.http.delete(`${API_URL}/happenings/${message.happening}/messages/${message.id}`).subscribe(
      () => this.getHappeningMessages(message.happening))

    return this.messageSource.asObservable()
  }

  public getHappeningMessages(id: string): Observable<any> {
    this.http.get(`${API_URL}/happenings/${id}/messages`)
    .subscribe(data => {
      this.happeningMessages = data as any
      this.messageSource.next(this.happeningMessages)
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
