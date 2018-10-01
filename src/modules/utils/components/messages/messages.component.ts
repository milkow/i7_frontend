import { Component, OnInit, Input } from '@angular/core'
import { Message } from '../../../../shared/models/message'
import { HappeningService } from '../../../../services/happening.service'
import { Happening } from '../../../../shared/models/happening'
import { MessageService } from '../../../../services/message.service'
import { UserService } from '../../../../services/user.service'
import { User } from '../../../../shared/models/user';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  currentUser: User
  responses: Message[] = []
  messages: Message[]
  newMessage: Message

  @Input() happening: Happening

  constructor(private messageService: MessageService, private userService: UserService) {
  }

  ngOnInit() {
    this.messageService
      .getHappeningMessages(this.happening.id)
      .subscribe(messages => {
        this.messages = this.filterResponses(messages)
        this.messages = this.sortByDate(this.messages)
      })

    this.userService
      .getCurrentUser()
      .subscribe(user => {
        this.currentUser = user
      })

    this.newMessage = new Message({
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
    this.messageService
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
