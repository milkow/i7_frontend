import { Component, OnInit } from '@angular/core'
import { HappeningService } from '../../../services/happening.service'

@Component({
  selector: 'app-event-photos',
  templateUrl: './event-photos.component.html',
  styleUrls: ['./event-photos.component.css']
})
export class EventPhotosComponent implements OnInit {
  photos: string[] = []

  constructor(
    private happeningService: HappeningService
  ) { }

  ngOnInit() {
    this.happeningService.getHappenings().subscribe(data => {
      this.photos = data.filter(x => x.image_medium != null).slice(0, 9).map(x => x.image_medium)
    })
  }

}
