import { Component, OnInit, Input } from '@angular/core'
import { Happening } from '../../../shared/models/happening'
import { Router } from '@angular/router'

@Component({
  selector: 'app-event-header',
  templateUrl: './event-header.component.html',
  styleUrls: ['./event-header.component.css']
})
export class EventHeaderComponent implements OnInit {
  @Input() happ: Happening

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoUserProfile(id: string) {
    this.router.navigate([`/users/${id}`])
  }

}
