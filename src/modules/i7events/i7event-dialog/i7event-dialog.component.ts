import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material'
import { I7Event } from '../../../shared/models/i7event'

@Component({
  selector: 'app-event-dialog',
  templateUrl: './i7event-dialog.component.html',
  styleUrls: ['./i7event-dialog.component.css']
})
export class I7EventDialogComponent implements OnInit {
  i7event: I7Event

  constructor(
    @Inject(MAT_DIALOG_DATA) data) {

    this.i7event = data.happening
}
  ngOnInit() {
  }

}
