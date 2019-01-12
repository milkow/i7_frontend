import {Component, OnInit} from '@angular/core'
import {I7EventService} from '../../../../services/i7event.service'
import {I7Event} from '../../../../shared/models/i7event'

@Component({
  selector: 'app-profile-album',
  templateUrl: './profile-album.component.html',
  styleUrls: ['./profile-album.component.scss']
})
export class ProfileAlbumComponent implements OnInit {
  loaded: boolean
  events: I7Event[]

  constructor(private eventService: I7EventService) {
  }

  ngOnInit() {
    this.loaded = false
    this.events = []
    this.eventService.list({'for-user': 'me'}).subscribe(this.receiveEvents)
  }

  receiveEvents = (events: I7Event[]) => {
    this.events = events
    this.loaded = true
  }

}
