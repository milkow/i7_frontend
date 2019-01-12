import {Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  @Input() strokeWidth = 3
  @Input() diameter = 100

  constructor() {
  }

  ngOnInit() {
  }

}
