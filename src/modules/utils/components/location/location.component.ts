import { Component, OnInit, Input } from '@angular/core'
import * as mapboxgl from 'mapbox-gl'
import { MapService } from '../../../../services/map.service'
import { ICoordinate } from '../../../../shared/models/map';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  providers: [MapService]
})
export class LocationComponent implements OnInit {
  selectedPlace: ICoordinate
  poi: string
  map: mapboxgl.Map
  style = 'mapbox://styles/mapbox/outdoors-v9'

  constructor(private mapService: MapService) { }

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
      this.selectedPlace = {
        latitude: event.lngLat.lat,
        longtitude: event.lngLat.lng
      }

      this.mapService.getPlace(this.selectedPlace)
      .subscribe(data => {
        this.poi = (data as any).features[0].place_name
      })
    })
    this.map.addControl(new mapboxgl.NavigationControl())
  }

}
