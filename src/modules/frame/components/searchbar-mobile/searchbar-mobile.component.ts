import {Component, OnDestroy, OnInit} from '@angular/core'
import {UserNotificationsService} from '../../../../services/user-notifications.service'
import {Subscription, Observable} from 'rxjs'
import {WebsocketTokenService} from '../../../../services/websocket-token.service'
import {UserSearchResponse, UserSearchWebsocket} from '../../../utils/websockets/user-search'
import {User} from '../../../../shared/models/user'
import {MessageTypes} from '../../../utils/websockets/message-types'
import {I7Event} from '../../../../shared/models/i7event'
import {Router, NavigationEnd, ActivatedRoute, NavigationStart, Event } from '@angular/router'
import { Location } from '@angular/common'
import { SearchBarService, IOptionValue, ISearchBarOptions, SearchMode } from '../../../../services/search-bar.service';
import { UserService } from '../../../../services/user.service';
import { I7EventService } from '../../../../services/i7event.service';

@Component({
  selector: 'app-searchbar-mobile',
  templateUrl: './searchbar-mobile.component.html',
  styleUrls: ['./searchbar-mobile.component.scss']
})
export class SearchbarMobileComponent implements OnInit, OnDestroy {
  public userNotificationsCount = ''
  search = ''
  usersWebsocket: UserSearchWebsocket
  messageTimeoutID: number
  usersFriends: User[] = []
  usersStrangers: User[] = []
  privateI7Events: I7Event[] = []
  publicI7Events: I7Event[] = []
  mainView = true
  i7event: I7Event
  options: ISearchBarOptions = {mode: SearchMode.GlobalSearch, options: []}
  searchMode = SearchMode


  constructor(
    private websocketService: WebsocketTokenService,
    private router: Router,
    private location: Location,
    private searchBarService: SearchBarService,
    private i7EventService: I7EventService
  ) {
  }

  private countSubscription: Subscription

  ngOnInit() {
    this.countSubscription = this.userNotifications
      .countObservable()
      .subscribe(this.userNotificationsCountReceived)

    this.usersWebsocket = new UserSearchWebsocket(this.onMessage, this.websocketService)
    this.searchBarService.getOptions().subscribe(options => this.options = options)

    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.search = ''
      }
      if (val instanceof NavigationStart) {
        this.searchBarService.getOptions().subscribe(options => this.options = options)
      }
    })
  }

  ngOnDestroy() {
    this.countSubscription.unsubscribe()
    this.usersWebsocket.close()
  }

  userNotificationsCountReceived = (count: number) => {
    if (count === 0) {
      this.userNotificationsCount = ''
      return
    }
    this.userNotificationsCount = `${count}`
  }

  onMessage = (data: UserSearchResponse) => {

    switch (data.type) {
      case MessageTypes.usersFriends:
        this.usersFriends = data.data as User[]
        break
      case MessageTypes.usersStrangers:
        this.usersStrangers = data.data as User[]
        break
      case MessageTypes.i7EventsPrivate:
         this.privateI7Events = (data.data as I7Event[]).map(x => new I7Event(x))
        break
      case MessageTypes.i7EventsPublic:
      this.publicI7Events = (data.data as I7Event[]).map(x => new I7Event(x))
        break
    }
    console.log(data)
  }

  ngOnInit() {
    this.usersWebsocket = new UserSearchWebsocket(this.onMessage, this.websocketService)
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.search = ''
      }
    })
  }

  onChangeSearchInput(value: string) {
    // Send message after short delay to prevent sending unnecessary message
    // if user is typing fast
    clearTimeout(this.messageTimeoutID)
    this.messageTimeoutID = setTimeout(this.sendSearch(value), 300) as any
  }

  sendSearch = (value: string) => () => {
    this.usersWebsocket.send(value)
  }

  checkIfMainView() {
    const routes = ['/dashboard', '/explore', '/groups', '/settings']
    if (routes.indexOf(this.router.url) !== -1) {
      return this.mainView = true
    }

    this.mainView = false
  }

  goToUsersList() {
    this.router.navigate([`/events/${this.i7event.id}/users`])
  }

  back() {
    this.location.back()
  }

  getFriendButtonText = () => {
    if (this.options.mode === SearchMode.ManageEventUsers) {
      return 'invite'
    }

    return null
  }

  getFriendButtonClickHandler = (user: User) => {
    if (this.options.mode === SearchMode.ManageEventUsers) {
      return this.inviteFriend(user)
    }

    return null
  }

  inviteFriend = (user: User) => {
    this.i7EventService
    .addUser(this.options.eventId, user.username)
    .subscribe(
      () => { this.usersFriends = this.usersFriends.filter(x => x.id !== user.id)},
      err => console.log(err)
    )
  }

  filterEventParticipants() {
  }
}
