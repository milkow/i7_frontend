import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'app-edit-attribute',
  templateUrl: './edit-attribute.component.html',
  styleUrls: ['./edit-attribute.component.css']
})
export class EditAttributeComponent implements OnInit {
  attribute = ''
  attributeName = ''

  constructor(public dialogRef: MatDialogRef<EditAttributeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.attribute = data.attribute
      this.attributeName = data.attributeName
    }

  ngOnInit() {
  }

  confirm() {
    this.dialogRef.close(this.attribute)
  }

}
