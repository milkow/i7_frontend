import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {environment} from '../environments/environment'
import {UserNotification} from '../shared/models/user-notification'
import {Observable, Subject} from 'rxjs'
import {map, take} from 'rxjs/operators'
import {UserNotificationMessage, UserNotificationsWebsocket, UserNotificationType} from '../modules/utils/websockets/user-notifications'
import {WebsocketTokenService} from './websocket-token.service'

@Injectable({
  providedIn: 'root'
})
export class UserNotificationsService {

  private ws: UserNotificationsWebsocket
  private $notificationsStream = new Subject<UserNotification>()
  private $notificationsCount = new Subject<number>()

  constructor(
    private http: HttpClient,
    private tokenIssuer: WebsocketTokenService,
  ) {
  }

  private onWebsocketMessage = (data: UserNotificationMessage) => {
    this.count()

    switch (data.type) {

      case UserNotificationType.userNotification:
        this.$notificationsStream.next(data.data)
        break

      case UserNotificationType.notificationsSeen:
        this.count()
        break

      default:
        console.warn(`Received data with type ${data.type} on UserNotificationsWebsocket. This type have no handler.`)
    }
  }

  list = (): Observable<UserNotification[]> => {
    return this.http.get(`${environment.apiUrl}/notifications`).pipe(
      map((notificationsList: any[]) => notificationsList.map(notification => new UserNotification(notification))),
      take(1),
    )
  }

  markAsSeen(id: string) {
    this.http
      .post(`${environment.apiUrl}/notifications/${id}/mark-as-seen`, null)
      .pipe(take(1))
      .subscribe(this.count)
  }

  markAsSeenAll() {
    this.http
      .post(`${environment.apiUrl}/notifications/mark-as-seen`, null)
      .pipe(take(1))
      .subscribe(this.count)
  }

  startListening = () => {
    this.ws = new UserNotificationsWebsocket(this.onWebsocketMessage, this.tokenIssuer)
  }

  stopListening = () => {
    this.ws.close()
    this.ws = null
  }

  getNotificationsStream = (): Observable<UserNotification> => {
    return this.$notificationsStream
  }

  count = () => {
    this.http
      .get(`${environment.apiUrl}/notifications/unseen-count`)
      .pipe(take(1))
      .subscribe((data: { count: number }) => {
        this.$notificationsCount.next(data.count)
      })
  }

  countObservable = (): Observable<number> => {
    return this.$notificationsCount
  }

}
