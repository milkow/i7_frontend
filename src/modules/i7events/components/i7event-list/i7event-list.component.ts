import { Component, OnInit, Input } from '@angular/core'
import { I7Event } from '../../../../shared/models/i7event'
import { Router } from '@angular/router'

@Component({
  selector: 'app-i7event-list',
  templateUrl: './i7event-list.component.html',
  styleUrls: ['./i7event-list.component.css']
})
export class I7eventListComponent implements OnInit {
  @Input() i7Events: I7Event[] = []
  description = 'Lorem Ipsum Foo bar tar lalala ' + 
  'michallinio stół bór woda monitor zdanie jest bardzo długie...'

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToI7EventDetails(id: string) {
    this.router.navigate([`/events/${id}`])
  }

}
