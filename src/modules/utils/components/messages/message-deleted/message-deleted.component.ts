import { Component, OnInit, Input } from '@angular/core'
import { MessageService } from '../../../../../services/message.service'
import { Message } from '../../../../../shared/models/message'

@Component({
  selector: 'app-message-deleted',
  templateUrl: './message-deleted.component.html',
  styleUrls: ['./message-deleted.component.css']
})
export class MessageDeletedComponent implements OnInit {
  replyClicked: boolean
  @Input() message: Message
  
  constructor() { }

  ngOnInit() {
  }

}