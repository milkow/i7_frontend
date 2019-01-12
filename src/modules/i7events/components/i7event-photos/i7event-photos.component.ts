import {Component, Input, OnInit} from '@angular/core'
import {I7EventService} from '../../../../services/i7event.service'
import {I7eventImage} from '../../../../shared/models/i7event-image'
import {I7Event} from '../../../../shared/models/i7event'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-event-photos',
  templateUrl: './i7event-photos.component.html',
  styleUrls: ['./i7event-photos.component.scss']
})
export class I7EventPhotosComponent implements OnInit {
  images: I7eventImage[]
  loaded: boolean
  i7event: I7Event

  constructor(
    private eventService: I7EventService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.loaded = false
    this.images = []
    // TODO fix this
    this.activatedRoute.params.subscribe((params: any) => {
      this.eventService.listEventImages(params['id']).subscribe(this.receiveImages)
      this.eventService.get(params['id']).subscribe(this.receiveI7Event)
    })

  }

  receiveImages = (images: I7eventImage[]) => {
    this.loaded = true
    this.images = images
  }

  receiveI7Event = (i7event) => {
    this.i7event = i7event
  }

}
