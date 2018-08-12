import {Component, OnInit} from '@angular/core'
import {Happening} from '../../../shared/models/Happening'
import {ApiService} from '../../../services/api/api.service'
import {Observable} from 'rxjs'
import { ApiMockService } from '../../../services/api/api-mock.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  happenings: Array<Object>

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService
      .getHappenings()
      .subscribe(
        (data: Array<Object>) => {
          this.happenings = data
        }
      )
  }

  private getHappenings() {
    return this.apiService.getHappenings()
  }
}
