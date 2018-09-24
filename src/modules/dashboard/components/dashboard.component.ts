import {Component, OnInit} from '@angular/core'
import {Happening} from '../../../shared/models/happening'
import {ApiService} from '../../../services/api.service'
import { EventDetailsComponent } from '../../events/event-details/event-details.component'
import { MatDialog } from '@angular/material'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  happenings: Happening[]

  constructor(private apiService: ApiService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.apiService
      .getHappenings()
      .subscribe(
        (data: Happening[]) => {
          this.happenings = data
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
