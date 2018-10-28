import { Component, OnInit, Input } from '@angular/core'
import { Message } from '../../../../shared/models/message'
import { I7Event } from '../../../../shared/models/i7event'
import { MessageService } from '../../../../services/message.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  responses: Message[] = []
  messages: Message[]

  @Input() i7event: I7Event

  constructor(
    private messageService: MessageService,
    private router: Router) {
  }

  ngOnInit() {
    this.getMessages()
  }

  getMessages() {
    this.messageService
    .getEventMessages(this.i7event.id)
    .subscribe(messages => {
      this.messages = this.filterResponses(messages)
      this.messages = this.sortByDate(this.messages)
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

  gotoUserProfile(id: string) {
    this.router.navigate([`/users/${id}`])
  }
}
