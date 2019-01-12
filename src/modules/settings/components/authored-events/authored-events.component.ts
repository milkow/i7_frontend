import {Component, OnInit} from '@angular/core'
import {I7EventService} from '../../../../services/i7event.service'
import {I7Event} from '../../../../shared/models/i7event'
import {Location} from '@angular/common';

@Component({
  selector: 'app-authored-events',
  templateUrl: './authored-events.component.html',
  styleUrls: ['./authored-events.component.scss']
})
export class AuthoredEventsComponent implements OnInit {

  loadedPast: boolean
  loadedFuture: boolean

  eventsPast: I7Event[]
  eventsFuture: I7Event[]

  constructor(private eventService: I7EventService, private location: Location) {
  }

  ngOnInit() {
    this.loadedPast = false
    this.loadedFuture = false
    this.eventsPast = []
    this.eventsFuture = []
    this.eventService.list({author: 'me', past: true}).subscribe(this.receivePastEvents)
    this.eventService.list({author: 'me', future: true}).subscribe(this.receiveFutureEvents)
  }


  receivePastEvents = (events: I7Event[]) => {
    this.loadedPast = true
    this.eventsPast = events

  }

  receiveFutureEvents = (events: I7Event[]) => {
    this.loadedFuture = true
    this.eventsFuture = events
  }

  goBack() {
    this.location.back()
  }
}
