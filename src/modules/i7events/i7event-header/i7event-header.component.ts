import { Component, OnInit, Input } from '@angular/core'
import { I7Event } from '../../../shared/models/i7event'
import { Router } from '@angular/router'

@Component({
  selector: 'app-event-header',
  templateUrl: './i7event-header.component.html',
  styleUrls: ['./i7event-header.component.css']
})
export class I7EventHeaderComponent implements OnInit {
  @Input() i7event: I7Event

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoUserProfile(id: string) {
    this.router.navigate([`/users/${id}`])
  }

}
