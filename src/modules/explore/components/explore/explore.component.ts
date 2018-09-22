import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../../../services/api.service'
import { Happening } from '../../../../shared/models/Happening'
import { IGeoJson, ICoordinate } from '../../../../shared/models/map'
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { EventCreateComponent } from '../../../events/event-create/event-create.component';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit {
  happenings: Observable<Happening[]>
  center: ICoordinate

  constructor(private apiService: ApiService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.happenings = this.apiService
    .getHappenings()

    this.center = {
      latitude: 53.1354890,
      longtitude: 23.1638400
    }
  }

  showAddHappeningDialog() {
    this.dialog.open(EventCreateComponent)
  }
}


