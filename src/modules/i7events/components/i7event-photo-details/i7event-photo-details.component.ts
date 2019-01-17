import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { I7EventService } from '../../../../services/i7event.service';
import { I7eventImage } from '../../../../shared/models/i7event-image';

@Component({
  selector: 'app-i7event-photo-details',
  templateUrl: './i7event-photo-details.component.html',
  styleUrls: ['./i7event-photo-details.component.css']
})
export class I7eventPhotoDetailsComponent implements OnInit {
  i7eventImage: I7eventImage

  constructor(
    private activatedRoute: ActivatedRoute,
    private i7eventService: I7EventService
  ) { }

  ngOnInit() {
    this.activatedRoute
      .params
      .pipe(
        switchMap(params => this.i7eventService.getI7EventImage(params['id'], params['photoId'])))
      .subscribe(img => this.i7eventImage = img)
  }

}
