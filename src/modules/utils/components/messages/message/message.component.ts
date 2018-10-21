import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message } from '../../../../../shared/models/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  public title = 'efewcqwcqw'
  @Input() message: Message
  @Output() onDeleteMessage = new EventEmitter<Message>()

  constructor() { }

  ngOnInit() {
  }

  delete() {
    this.onDeleteMessage.emit(this.message)
  }

}
