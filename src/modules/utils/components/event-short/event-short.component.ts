import {Component, Input, OnInit} from '@angular/core'
import {I7Event} from '../../../../shared/models/i7event'

@Component({
  selector: 'app-event-short',
  templateUrl: './event-short.component.html',
  styleUrls: ['./event-short.component.css']
})
export class EventShortComponent implements OnInit {
  @Input() event: I7Event
  @Input() showStart = false
  @Input() showEnd = false

  constructor() {
  }

  ngOnInit() {
  }

}
