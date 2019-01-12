import {Component, OnInit, Input} from '@angular/core'
import {I7Event} from '../../../../shared/models/i7event'
import {Router} from '@angular/router'

@Component({
  selector: 'app-i7event-list',
  templateUrl: './i7event-list.component.html',
  styleUrls: ['./i7event-list.component.css']
})
export class I7eventListComponent implements OnInit {
  @Input() i7Events: I7Event[] = []
  description = 'Lorem Ipsum Foo bar tar lalala ' +
    'michallinio stół bór woda monitor zdanie jest bardzo długie...'

  @Input() clickCallback: (event: I7Event) => void
  @Input() selectOnClick = false

  selectedId: string

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  onClick(i7event: I7Event) {
    this.selectedId = i7event.id
    if (!this.clickCallback) {
      this.router.navigate([`/events/${i7event.id}`])
    } else {
      this.clickCallback(i7event)
    }
  }

  getSelectStyle(i7event: I7Event) {
    if (!this.selectOnClick) {
      return
    }

    if (i7event.id !== this.selectedId) {
      return {}
    }

    return {
      border: '2px solid #548EFF'
    }
  }

}
