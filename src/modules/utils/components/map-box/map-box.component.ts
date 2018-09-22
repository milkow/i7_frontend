import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core'
import * as mapboxgl from 'mapbox-gl'
import { MapService } from '../../../../services/map.service'
import { GeoJson, IGeometry, ICoordinate } from '../../../../shared/models/map'
import { Happening } from '../../../../shared/models/Happening'
import { ApiService } from '../../../../services/api.service'

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.scss'],
  providers: [MapService]
})
export class MapBoxComponent implements OnInit {
@Input() center: ICoordinate
happenings: Happening[]

  map: mapboxgl.Map
  style = 'mapbox://styles/mapbox/outdoors-v9'

  source: any
  markers: mapboxgl.Marker[]

  constructor(private mapService: MapService, private apiService: ApiService) {
  }

  ngOnInit() {
    this.mapService.getMarkers()
      .subscribe(markers => {
        this.markers = markers
      })

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
      center: [this.center.longtitude, this.center.latitude]
    })

    this.map.addControl(new mapboxgl.NavigationControl())

    this.map.on('load', (event) => {
      console.log(this.markers)
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