import { Component, OnInit, Input } from '@angular/core'
import { Message } from '../../../../shared/models/message'
import { ApiService } from '../../../../services/api.service'
import { Happening } from '../../../../shared/models/happening'
import { MessageService } from '../../../../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  responses: Message[] = []
  messages: Message[]
  newMessage: Message

  @Input() happening: Happening

  constructor(private apiService: ApiService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.apiService
      .getHappeningMessages(this.happening.id)
      .subscribe(messages => {
        this.messages = this.filterResponses(messages)
        this.messages = this.sortByDate(this.messages)
      })
      
      this.newMessage = new Message ({
        body: '',
        in_response_to: null,
        happening: this.happening.id
      })
  }

  deleteMessage(message: Message) {
    this.messageService
    .deleteMessage(message.happening, message.id)
    .subscribe(() => {
      message.removed = true
    })
  }

  sendMessage() {
    this.apiService
    .sendMessage(this.newMessage)
    .subscribe(msg => {
      this.messages.push(msg)
    })
  }

  sortByDate(messages: Message[]) {
    return messages.sort((a, b) => {
      if (a.created < b.created) {
        return -1
      } else if (a.created > b.created) {
        return 1
      } else {
        return 0
      }
    })
  }

  filterResponses(messages: Message[]) {
    this.responses = []
    return messages.filter(value => {
      if (value.in_response_to) {
          this.responses.push(value)
          return false
      } else {
        return true
      }
    })
  }
}
