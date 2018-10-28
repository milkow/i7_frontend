import { Component, OnInit, Input } from '@angular/core'
import * as mapboxgl from 'mapbox-gl'
import { MapService } from '../../../../services/map.service'
import { GeoJson, IGeometry, ICoordinate } from '../../../../shared/models/map'
import { I7Event } from '../../../../shared/models/i7event'

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.scss'],
  providers: [MapService]
})
export class MapBoxComponent implements OnInit {
  @Input() center: ICoordinate
  @Input() markers: mapboxgl.Marker[] = []
  
  events: I7Event[]
  map: mapboxgl.Map
  style = 'mapbox://styles/mapbox/outdoors-v9'
  source: any

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    this.initializeMap()
  }

  private initializeMap() {
    this.buildMap()
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 12,
      center: [this.center[1], this.center[0]]
    })

    this.map.addControl(new mapboxgl.NavigationControl())

    this.map.on('load', (event) => {
      this.markers.forEach(el => {
        el.addTo(this.map)
      })
    })
  }

  removeMarker(marker) {
    this.mapService.removeMarker(marker.$key)
  }

  flyTo(data: GeoJson) {
    this.map.flyTo({
      center: data.geometry.coordinates
    })
  }
}
