import {Component, OnInit} from '@angular/core'
import {Happening} from '../../../shared/models/happening'
import {HappeningService} from '../../../services/happening.service'
import { MatDialog } from '@angular/material'
import { Router } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  happenings: Happening[]

  constructor(private happeningService: HappeningService, private dialog: MatDialog, private router: Router) {
  }

  ngOnInit() {
    this.happeningService
      .getHappenings()
      .subscribe(
        (data: Happening[]) => {
          this.happenings = data.filter(el => el.image_normal != null)
        }
      )
  }

  goToDetails(happening: Happening) {
    this.router.navigate([`/events/${happening.id}`])
    //   this.dialog.open(EventDialogComponent, {
    //     position: {top: '0px'},
    //     width: '900px',
    //     height: '100%',
    //     data: {happening: happening}
    //   })
      }
}
