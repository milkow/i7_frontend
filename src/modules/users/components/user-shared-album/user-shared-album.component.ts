import {Component, Input, OnInit} from '@angular/core'
import {I7EventService} from '../../../../services/i7event.service'
import {I7Event} from '../../../../shared/models/i7event'

@Component({
  selector: 'app-user-shared-album',
  templateUrl: './user-shared-album.component.html',
  styleUrls: ['./user-shared-album.component.scss']
})
export class UserSharedAlbumComponent implements OnInit {
  @Input() userId: string
  loaded: boolean
  events: I7Event[]

  constructor(private eventService: I7EventService) {
  }

  ngOnInit() {
    this.loaded = false
    this.eventService.list({'for-user': this.userId}).subscribe(this.receiveEvents)
  }

  receiveEvents = (events: I7Event[]) => {
    this.loaded = true
    this.events = events
  }

}
