import { Component, OnInit, OnDestroy } from '@angular/core'
import { Happening } from '../../../../shared/models/happening'
import { IGeoJson, ICoordinate } from '../../../../shared/models/map'
import { Observable } from 'rxjs'
import { MatDialog } from '@angular/material'
import { EventCreateComponent } from '../../../events/event-create/event-create.component'
import { HappeningService } from '../../../../services/happening.service'
import { MapService } from '../../../../services/map.service'
import * as mapboxgl from 'mapbox-gl'

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  providers: [MapService]
})
export class ExploreComponent implements OnInit, OnDestroy {
  happenings: Observable<Happening[]>
  markers: mapboxgl.Marker[][]
  center: number[]

  constructor(
    private happeningService: HappeningService,
    private dialog: MatDialog,
    private mapService: MapService) {
  }

  ngOnInit() {
    this.happenings = this.happeningService
    .getHappenings()

    this.center = [ 53.1354890, 23.1638400]

    this.mapService.getMarkers()
    .subscribe(markers => {
      this.markers = markers
    })
  }

  ngOnDestroy() {
    this.dialog.closeAll()
  }

  showAddHappeningDialog() {
    this.dialog.open(EventCreateComponent, {
      width: '515px',
      autoFocus: false
    })
  }
}


