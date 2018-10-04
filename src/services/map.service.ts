import { Injectable } from '@angular/core'
import { environment } from '../environments/environment'
import * as mapboxgl from 'mapbox-gl'
import { HappeningService } from './happening.service'
import { Happening } from '../shared/models/happening'
import { of, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { MatDialog, MatDialogConfig } from '@angular/material'
import { ICoordinate } from '../shared/models/map'
import { HttpClient } from '@angular/common/http'
import { EventDialogComponent } from '../modules/events/event-dialog/event-dialog.component'

const mapboxApiUrl = environment.mapbox.apiUrl
const token = environment.mapbox.accessToken

@Injectable()
export class MapService {
  markers: mapboxgl.Marker[]

  constructor(private http: HttpClient, private happeningService: HappeningService, private dialog: MatDialog) {
    (mapboxgl as any).accessToken  = environment.mapbox.accessToken
  }

  getMarkers(): Observable<mapboxgl.Marker[]> {
    return this.happeningService
    .getHappenings()
    .pipe(
      map(response => {
        return response.map(el => {
          return this.createMarker(el)
        })
      }))
  }

  getPlaceOfInterest(coords: ICoordinate) {
    return this.http.get(`${mapboxApiUrl}/mapbox.places/${coords.longtitude},${coords.latitude}.json?types=poi&access_token=${token}`)
  }

  createMarker(happening: Happening) {
    const el = document.createElement('div')
    el.addEventListener('click', () => {
      this.showModal(happening)
    })
    el.className = 'marker'
    el.style.backgroundImage = `url(${happening.image_small})`
    el.style.width = '70px'
    el.style.height = '70px'

    return new mapboxgl.Marker(el)
      .setLngLat([happening.geo_coordinates.coordinates[1], happening.geo_coordinates.coordinates[0]])
  }

  removeMarker($key: string) {
  }

  showModal(happening: Happening) {
  this.dialog.open(EventDialogComponent, {
     position: {top: '0px'},
     width: '700px',
     height: '100%',
     data: {happening: happening}
   })

  }
}
