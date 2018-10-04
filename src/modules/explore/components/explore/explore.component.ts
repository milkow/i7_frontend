import { Component, OnInit } from '@angular/core'
import { Happening } from '../../../../shared/models/happening'
import { IGeoJson, ICoordinate } from '../../../../shared/models/map'
import { Observable } from 'rxjs'
import { MatDialog } from '@angular/material'
import { EventCreateComponent } from '../../../events/event-create/event-create.component'
import { HappeningService } from '../../../../services/happening.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit {
  happenings: Observable<Happening[]>
  center: ICoordinate

  constructor(private happeningService: HappeningService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.happenings = this.happeningService
    .getHappenings()

    this.center = {
      latitude: 53.1354890,
      longtitude: 23.1638400
    }
  }

  showAddHappeningDialog() {
    const ref = this.dialog.open(EventCreateComponent, {
      width: '515px',
      autoFocus: false
    })
    ref.componentInstance.destroy.subscribe(() => {
      this.dialog.closeAll()
    })
  }
}


