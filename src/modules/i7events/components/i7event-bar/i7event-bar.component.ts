import { Component, OnInit, Input } from '@angular/core'
import { I7Event } from '../../../../shared/models/i7event'

@Component({
  selector: 'app-i7event-bar',
  templateUrl: './i7event-bar.component.html',
  styleUrls: ['./i7event-bar.component.scss']
})
export class I7eventBarComponent implements OnInit {
  @Input() likedI7Events: I7Event[]

  constructor() { }

  ngOnInit() {
  }

}
