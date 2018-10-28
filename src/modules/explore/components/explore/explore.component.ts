import { Component, OnInit, OnDestroy } from '@angular/core'
import { I7Event } from '../../../../shared/models/i7event'
import { Observable } from 'rxjs'
import { MatDialog } from '@angular/material'
import { I7EventCreateComponent } from '../../../i7events/i7event-create/i7event-create.component'
import { I7EventService } from '../../../../services/i7event.service'
import { MapService } from '../../../../services/map.service'
import * as mapboxgl from 'mapbox-gl'

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  providers: [MapService]
})
export class ExploreComponent implements OnInit, OnDestroy {
  events: Observable<I7Event[]>
  markers: mapboxgl.Marker[][]
  center: number[]

  constructor(
    private eventService: I7EventService,
    private dialog: MatDialog,
    private mapService: MapService) {
  }

  ngOnInit() {
    this.events = this.eventService.getAll()

    this.center = [ 53.1354890, 23.1638400]

    this.mapService.getMarkers()
    .subscribe(markers => {
      this.markers = markers
    })
  }

  ngOnDestroy() {
    this.dialog.closeAll()
  }

  showAddEventDialog() {
    this.dialog.open(I7EventCreateComponent, {
      width: '515px',
      autoFocus: false
    })
  }
}


