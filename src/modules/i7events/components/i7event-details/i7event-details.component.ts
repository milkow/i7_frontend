import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { I7Event } from '../../../../shared/models/i7event'
import { Message } from '../../../../shared/models/message'
import { ActivatedRoute, Router } from '@angular/router'
import { I7EventService } from '../../../../services/i7event.service'
import { MapService } from '../../../../services/map.service'
import { Marker } from 'mapbox-gl'
import { SearchBarService, SearchMode, ISearchBarOptions } from '../../../../services/search-bar.service'
import { UserService } from '../../../../services/user.service'
import { User } from '../../../../shared/models/user'
import { UtilsService } from '../../../../services/utils.service'

@Component({
  selector: 'app-event-details',
  templateUrl: './i7event-details.component.html',
  styleUrls: ['./i7event-details.component.css'],
  providers: [MapService]
})
export class I7EventDetailsComponent implements OnInit, OnDestroy {
  currentUser: User
  options: ISearchBarOptions = {mode: SearchMode.GlobalSearch, options: []}
  descriptionView: boolean
  messages: Message[]
  marker: Marker
  @Input() i7event: I7Event

  constructor(
    private route: ActivatedRoute,
    private i7EventService: I7EventService,
    private router: Router,
    private mapService: MapService,
    private searchBarService: SearchBarService,
    private userService: UserService,
    public utilsService: UtilsService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (!params['id']) {
        return
      }

      if (this.router.url.indexOf('description') > -1) {
        this.descriptionView = true
      }

      this.userService.getCurrentUser().subscribe(user => this.currentUser = user)
      this.i7EventService.get(params['id']).subscribe(i7event => {
        this.i7event = i7event
        this.setOptions()
        this.mapService.getMarker(this.i7event.id)
        .subscribe(marker => {
          this.marker = marker
        })
      })
    })
  }

  ngOnDestroy() {
    this.searchBarService.resetOptions()
  }

  gotoUserProfile(id: string) {
    this.router.navigate([`/users/${id}`])
  }

  goToPhotos() {
    this.router.navigate([`/events/${this.i7event.id}/photos`])
  }

  goToManageUsers = () => {
    this.router.navigate([`/events/${this.i7event.id}/users`])
  }

  goToEventSettings = () => {
    this.router.navigate([`/events/${this.i7event.id}/settings`])
  }

  getCoverImage() {
    return `url('${this.i7event.image_normal}')`
  }

  setOptions() {
    this.options.options =  [
      { text: 'Report', icon: 'report', handler: this.reportEvent }
    ]

    if (this.i7event.author.id === this.currentUser.id) {
      if (!this.i7event.public) {
        this.options.options.push({ text: 'Manage participants', icon: 'people', handler: this.goToManageUsers })
      }
      this.options.options.push({ text: 'Event Options', icon: 'settings', handler: this.goToEventSettings })
    }

    this.searchBarService.setOptions(
      {
        mode: SearchMode.GlobalSearch,
        options: this.options.options
      })
  }

  reportEvent = () => {
    console.log(`Not implemented.`)
  }
}

