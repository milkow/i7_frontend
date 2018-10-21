import { Component, OnInit, Input } from '@angular/core'
import { Message } from '../../../../../shared/models/message'
import { MessageService } from '../../../../../services/message.service'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  replyClicked: boolean
  
  @Input() message: Message

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  delete() {
    this.messageService.deleteMessage(this.message)
  }
}
