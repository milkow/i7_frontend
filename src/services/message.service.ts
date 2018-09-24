import { Injectable } from '@angular/core'
import { environment } from '../environments/environment'
import { Observable, throwError } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Happening } from '../shared/models/happening'
import { Message } from '../shared/models/message';

const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private http: HttpClient
  ) { }

  public sendMessage(message: Message): Observable<any> {
    const body = {
      in_response_to: message.in_response_to,
      body: message.body
    }

    return this.http.post(`${API_URL}/happenings/${message.happening}/messages/`, body)
  }

  public deleteMessage(happeningId: string, messageId: string): Observable<any> {
    return this.http.delete(`${API_URL}/happenings/${happeningId}/messages/${messageId}`)
  }

  private handleError<T> (operation = 'operation') {
    return (error: any): Observable<T> => {
      console.log(error)
      console.log(`${operation} failed: ${error.message}`)
      return throwError(error.error)
    }
  }
}
