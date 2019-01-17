import { Component, OnInit, Input } from '@angular/core'
import {Location} from '@angular/common'

@Component({
  selector: 'app-arrow-back',
  templateUrl: './arrow-back.component.html',
  styleUrls: ['./arrow-back.component.scss']
})
export class ArrowBackComponent implements OnInit {
  @Input() handler: Function
  constructor(private _location: Location) { }

  ngOnInit() {
  }

  backClicked() {
    this._location.back()
  }

}
