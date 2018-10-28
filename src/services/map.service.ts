import { Injectable } from '@angular/core'
import { environment } from '../environments/environment'
import * as mapboxgl from 'mapbox-gl'
import { I7EventService } from './i7event.service'
import { I7Event } from '../shared/models/i7event'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { MatDialog } from '@angular/material'
import { ICoordinate } from '../shared/models/map'
import { HttpClient } from '@angular/common/http'
import { I7EventDialogComponent } from '../modules/i7events/i7event-dialog/i7event-dialog.component'

const mapboxApiUrl = environment.mapbox.apiUrl
const token = environment.mapbox.accessToken

@Injectable()
export class MapService {
  markers: mapboxgl.Marker[]

  constructor(private http: HttpClient, private happeningService: I7EventService, private dialog: MatDialog) {
    (mapboxgl as any).accessToken  = environment.mapbox.accessToken
  }

  getMarkers(): Observable<mapboxgl.Marker[]> {
    return this.happeningService
    .getAll()
    .pipe(
      map(response => {
        return response.map(el => {
          return this.createHappeningMarker(el)
        })
      }))
  }

  getMarker(happeningId: string): Observable<mapboxgl.Marker> {
    return this.happeningService
    .get(happeningId)
    .pipe(
      map(response => {
          return this.createMarker(response)
      }))
  }

  getPlaceOfInterest(coords: ICoordinate) {
    return this.http.get(`${mapboxApiUrl}/mapbox.places/${coords.longtitude},${coords.latitude}.json?types=poi&access_token=${token}`)
  }

  createHappeningMarker(happening: I7Event) {
    const el = document.createElement('div')
    el.addEventListener('click', () => {
      this.showModal(happening)
    })
    el.className = 'marker'
    el.style.borderRadius = '19px'
    el.style.backgroundImage = `url(${happening.image_medium})`
    el.style.width = '70px'
    el.style.height = '70px'

    return new mapboxgl.Marker(el)
      .setLngLat([happening.geo_coordinates.coordinates[1], happening.geo_coordinates.coordinates[0]])
  }

  createMarker(event: I7Event) {
    const el = document.createElement('div')

    el.className = 'marker'
    el.style.backgroundImage = `url(${event.image_medium})`
    el.style.borderRadius = '5px'
    el.style.width = '30px'
    el.style.height = '30px'

    return new mapboxgl.Marker(el)
      .setLngLat([event.geo_coordinates.coordinates[1], event.geo_coordinates.coordinates[0]])
  }

  removeMarker($key: string) {
  }

  showModal(happening: I7Event) {
  this.dialog.open(I7EventDialogComponent, {
     position: {top: '0px'},
     width: '700px',
     height: '100%',
     data: {happening: happening}
   })

  }
}
