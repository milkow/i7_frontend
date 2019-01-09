import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'app-i7event-delete',
  templateUrl: './i7event-delete.component.html',
  styleUrls: ['./i7event-delete.component.css']
})
export class I7EventDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<I7EventDeleteComponent>) {}

  ngOnInit() {
  }

}
