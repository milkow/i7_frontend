import { Component, OnInit, Inject, EventEmitter } from '@angular/core'
import { EventDetailsComponent } from '../event-details/event-details.component'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { Happening } from '../../../shared/models/happening'

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.css']
})
export class EventDialogComponent implements OnInit {
  happening: Happening

  constructor(
    private dialogRef: MatDialogRef<EventDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.happening = data.happening
}
  ngOnInit() {
  }

}
