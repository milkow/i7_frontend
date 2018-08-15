import {Component, OnInit} from '@angular/core'
import {Happening} from '../../../shared/models/Happening'
import {ApiService} from '../../../services/api.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  happenings: Happening[]

  constructor(private apiService: ApiService) {
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
}
