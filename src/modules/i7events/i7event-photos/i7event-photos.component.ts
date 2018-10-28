import { Component, OnInit } from '@angular/core'
import { I7EventService } from '../../../services/i7event.service'

@Component({
  selector: 'app-event-photos',
  templateUrl: './i7event-photos.component.html',
  styleUrls: ['./i7event-photos.component.css']
})
export class I7EventPhotosComponent implements OnInit {
  photos: string[] = []

  constructor(
    private eventService: I7EventService
  ) { }

  ngOnInit() {
    this.eventService.getAll().subscribe(data => {
      this.photos = data.filter(x => x.image_medium != null).slice(0, 9).map(x => x.image_medium)
    })
  }

}
