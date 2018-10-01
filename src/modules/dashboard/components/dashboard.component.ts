import {Component, OnInit} from '@angular/core'
import {Happening} from '../../../shared/models/happening'
import {HappeningService} from '../../../services/happening.service'
import { EventDetailsComponent } from '../../events/event-details/event-details.component'
import { MatDialog } from '@angular/material'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  happenings: Happening[]

  constructor(private apiService: HappeningService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.apiService
      .getHappenings()
      .subscribe(
        (data: Happening[]) => {
          this.happenings = data.filter(el => el.image_normal != null)
        }
      )
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
