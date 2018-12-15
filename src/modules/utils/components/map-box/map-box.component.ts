import { Component, OnInit, Input } from '@angular/core'
import { MapService } from '../../../../services/map.service'
import { ICoordinate } from '../../../../shared/models/map'
import { I7Event } from '../../../../shared/models/i7event'
import { Map, NavigationControl, Marker} from 'mapbox-gl'
import { Location } from '@angular/common'
import { fromEvent } from 'rxjs'

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.scss'],
  providers: [MapService]
})
export class MapBoxComponent implements OnInit {
  @Input() center: ICoordinate
  @Input() zoom: number
  @Input() markers: Marker[] = []
  @Input() onMapDrag: () => {}

  events: I7Event[]
  map: Map
  style = 'mapbox://styles/mapbox/outdoors-v9'
  source: any

  constructor(private location: Location) {
  }

  ngOnInit() {
    this.initializeMap()
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

    fromEvent(this.map, 'drag').subscribe(ev => {
    })
  }

  placeMarkers = () => {
    if (!this.markers) {
      return
    }

    this.markers.forEach(el => {
      el.addTo(this.map)
    })
  }
}
