import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent implements OnInit {
  hours = Array.from(Array(24).keys())

  constructor() { }

  ngOnInit() {
  }

}
