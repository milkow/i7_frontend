import {Component, Inject, OnInit} from '@angular/core'
import {MatDialogRef} from '@angular/material'
import {MAT_DIALOG_DATA} from '@angular/material'
import {I7eventImage} from '../../../../shared/models/i7event-image'
import {I7EventService} from '../../../../services/i7event.service'

@Component({
  selector: 'app-image-delete-dialog',
  templateUrl: './image-delete-dialog.component.html',
  styleUrls: ['./image-delete-dialog.component.css']
})
export class ImageDeleteDialogComponent implements OnInit {
  pending = false
  error: string

  constructor(
    private eventService: I7EventService,
    private dialogRef: MatDialogRef<ImageDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { image: I7eventImage },
  ) {
  }

  ngOnInit() {
  }

  del() {
    this.error = null
    this.pending = true
    this.eventService.deleteImage(this.data.image.i7event, this.data.image.id).subscribe(() => {
      this.error = null
      this.pending = false
      this.dialogRef.close({deleted: true})
    }, () => {
      this.error = 'Something went wrong.'
      this.pending = false
    })
  }
}
