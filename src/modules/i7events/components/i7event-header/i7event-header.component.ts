import { Component, OnInit, Input } from '@angular/core'
import { I7Event } from '../../../../shared/models/i7event'
import { Router } from '@angular/router'
import { I7EventService } from '../../../../services/i7event.service'

@Component({
  selector: 'app-event-header',
  templateUrl: './i7event-header.component.html',
  styleUrls: ['./i7event-header.component.scss']
})
export class I7EventHeaderComponent implements OnInit {
  @Input() i7event: I7Event

  constructor(private router: Router, private i7EventService: I7EventService) { }

  ngOnInit() {
  }

  gotoUserProfile(id: string) {
    this.router.navigate([`/users/${id}`])
  }

  handleLikeClick() {
      this.i7event.my_like
      ? this.i7EventService.unlike(this.i7event.id).subscribe(() => {this.i7event.likes--; this.i7event.my_like = false})
      : this.i7EventService.like(this.i7event.id).subscribe(() => {this.i7event.likes++; this.i7event.my_like = true})
  }
}
