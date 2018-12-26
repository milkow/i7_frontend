import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { ICoordinate } from '../../../../shared/models/map'
import { MapService } from '../../../../services/map.service'
import { Map, Marker, NavigationControl } from 'mapbox-gl'

export interface IEventLocation {
  coords: ICoordinate,
  poi: string
}

@Component({
  selector: 'app-i7-event-location',
  templateUrl: './i7-event-location.component.html',
  styleUrls: ['./i7-event-location.component.scss'],
  providers: [MapService]
})
export class I7EventLocationComponent implements OnInit {
  @Output() onBackPressed = new EventEmitter()
  @Output() onSubmit = new EventEmitter<IEventLocation>()
  selectedPlace: ICoordinate
  marker: Marker
  poi: string
  map: Map
  style = 'mapbox://styles/mapbox/outdoors-v9'

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.buildMap()
  }

  buildMap() {
    this.map = new Map({
      container: 'location',
      style: this.style,
      zoom: 12,
      center: [23.1688400, 53.1424890]
    })

    this.map.on('click', event => {
      this.removeMarker()
      this.selectedPlace = {
        latitude: event.lngLat.lat,
        longtitude: event.lngLat.lng
      }

      this.marker = new Marker().setLngLat([this.selectedPlace.longtitude, this.selectedPlace.latitude])
      this.marker.addTo(this.map)

      this.mapService.getPlaceOfInterest(this.selectedPlace)
      .subscribe(data => {
        this.poi = (data as any).features[0] ? (data as any).features[0].place_name : 'unknown'
      })
    })
    this.map.addControl(new NavigationControl())
  }

  removeMarker() {
    if (this.marker) {
      this.marker.remove()
    }
  }

  getFormattedPlaceOfInterest() {
  if (this.poi.length > 60) {
      return this.poi.substr(0, 60) + '...'
    }
    return this.poi
  }

  back() {
    this.onBackPressed.emit(null)
  }

  submit() {
    this.onSubmit.emit({coords: this.selectedPlace, poi: this.poi})
  }
}
