import { Component, OnInit, Input } from '@angular/core'
import * as mapboxgl from 'mapbox-gl'
import { MapService } from '../../../../services/map.service'
import { ICoordinate } from '../../../../shared/models/map'
import { MatDialogRef } from '@angular/material'

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  providers: [MapService]
})
export class LocationComponent implements OnInit {
  selectedPlace: ICoordinate
  marker: mapboxgl.Marker
  poi: string
  map: mapboxgl.Map
  style = 'mapbox://styles/mapbox/outdoors-v9'

  constructor(private mapService: MapService, private dialogRef: MatDialogRef<LocationComponent>) { }

  ngOnInit() {
    this.buildMap()
  }

  buildMap() {
    this.map = new mapboxgl.Map({
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

      this.marker = new mapboxgl.Marker().setLngLat([this.selectedPlace.longtitude, this.selectedPlace.latitude])
      this.marker.addTo(this.map)

      this.mapService.getPlaceOfInterest(this.selectedPlace)
      .subscribe(data => {
        this.poi = (data as any).features[0] ? (data as any).features[0].place_name : 'unknown'
      })
    })
    this.map.addControl(new mapboxgl.NavigationControl())
  }

  removeMarker() {
    if (this.marker) {
      this.marker.remove()
    }
  }

  closeDialog() {
    this.dialogRef.close({
      coords: this.selectedPlace,
      poi: this.poi
    })
  }

}
