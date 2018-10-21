import { Component, OnInit, Inject, Input } from '@angular/core'
import { Happening } from '../../../shared/models/happening'
import { Message } from '../../../shared/models/message'
import { ActivatedRoute, Router } from '@angular/router'
import { HappeningService } from '../../../services/happening.service'
import { MapService } from '../../../services/map.service'
import * as mapboxgl from 'mapbox-gl'

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
  providers: [MapService]
})
export class EventDetailsComponent implements OnInit {
  messages: Message[]
  marker: mapboxgl.marker
  @Input() happening: Happening

  constructor(private route: ActivatedRoute,
    private happeningService: HappeningService,
    private router: Router,
    private mapService: MapService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (!params['id']) {
        return
      }

      this.happeningService.getHappening(params['id']).subscribe(happ => {
        this.happening = happ
        this.mapService.getMarker(this.happening.id)
        .subscribe(marker => {
          this.marker = marker
        })
      })
    })
  }

  goToUsersList() {
    this.router.navigate([`/events/${this.happening.id}/users`])
  }

  gotoUserProfile(id: string) {
    this.router.navigate([`/users/${id}`])
  }
}

