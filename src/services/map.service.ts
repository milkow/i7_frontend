import { Injectable } from '@angular/core'
import { environment } from '../environments/environment'
import * as mapboxgl from 'mapbox-gl'
import { ApiService } from './api.service'
import { Happening } from '../shared/models/happening'
import { of, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { MatDialog, MatDialogConfig } from '@angular/material'
import { EventCreateComponent } from '../modules/events/event-create/event-create.component';
import { EventDetailsComponent } from '../modules/events/event-details/event-details.component';

const coords = [
  [23.1688400, 53.1424890],
  [23.1888400, 53.1324890],
  [23.1488400, 53.1284890],
  [23.1228400, 53.1544890],
  [23.1908400, 53.1384890],
  [23.1588400, 53.1424890],
  [23.1678400, 53.1524890],
  [23.1658400, 53.1604890],
  [23.1628400, 53.1574890],
  [23.1713400, 53.1604890],
  [23.1811400, 53.1684890],
  [23.1218400, 53.1524890],
]

@Injectable()
export class MapService {
  markers: mapboxgl.Marker[]

  constructor(private apiService: ApiService, private dialog: MatDialog) {
    (mapboxgl as any).accessToken  = environment.mapbox.accessToken
  }

  getMarkers(): Observable<mapboxgl.Marker[]> {
    return this.apiService
    .getHappenings()
    .pipe(
      map(response => {
        return response.map(el => {
          return this.createMarker(el)
        })
      }))
  }

  createMarker(happening: Happening) {
    const el = document.createElement('div')
    el.addEventListener('click', () => {
      this.showModal(happening)
    })
    el.className = 'marker'
    el.style.backgroundImage = `url(${happening.image})`
    el.style.width = '70px'
    el.style.height = '70px'

    return new mapboxgl.Marker(el)
      .setLngLat(this.getRandomCoords())
  }

  removeMarker($key: string) {
  }

  getRandomCoords() {
    return coords[Math.floor(Math.random() * coords.length)]
  }

  showModal(happening: Happening) {
   this.dialog.open(EventDetailsComponent, {
     position: {top: '0px'},
     width: '900px',
     height: '100%',
     data: {happ: happening}
   })
  }
}
