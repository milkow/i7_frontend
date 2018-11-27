import { Component, OnInit, OnDestroy } from '@angular/core'
import { I7Event } from '../../../../shared/models/i7event'
import { Observable, fromEvent } from 'rxjs'
import { MatDialog } from '@angular/material'
import { I7EventService } from '../../../../services/i7event.service'
import { MapService } from '../../../../services/map.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { Location } from '@angular/common'
import { Marker, Map, NavigationControl } from 'mapbox-gl'

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  providers: [MapService]
})
export class ExploreComponent implements OnInit, OnDestroy {
  map: Map
  style = 'mapbox://styles/mapbox/outdoors-v9'
  events: Observable<I7Event[]>
  markers: Marker[]
  center: number[]
  zoom: number

  constructor(
    private eventService: I7EventService,
    private dialog: MatDialog,
    private mapService: MapService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) {
      this.route.queryParamMap.subscribe((data: ParamMap) => {
        const lat = parseFloat(data.get('lat'))
        const lng = parseFloat(data.get('lng'))
        const zoom = parseFloat(data.get('zoom'))

        if (!lat && !lng) {
          this.center = [53.1354890, 23.1638400]
          this.zoom = 12
          return
        }

        this.center = [lat, lng]
        this.zoom = zoom
      })
  }

  ngOnInit() {
    this.events = this.eventService.getAll()

    this.mapService.getMarkers()
    .subscribe(markers => {
      this.markers = markers
      this.initializeMap()
    })
  }

  ngOnDestroy() {
    this.dialog.closeAll()
  }


  initializeMap() {
    this.map = new Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.center[1], this.center[0]]
    })

    this.map.addControl(new NavigationControl())

    fromEvent(this.map, 'load').subscribe(this.placeMarkers)
    fromEvent(this.map, 'drag').subscribe(this.onMapDrag)
  }

  placeMarkers = () => {
    if (!this.markers) {
      return
    }

    this.markers.forEach(el => {
      el.addTo(this.map)
    })
  }

  goToCreateEvent() {
    this.router.navigate(['/events/create'])
  }

  onMapDrag = () => {
    const center = this.map.getCenter()
    const zoom = this.map.getZoom()

    this.location.replaceState(`/explore/?lat=${center.lat}&lng=${center.lng}&zoom=${zoom}`)
  }
}


