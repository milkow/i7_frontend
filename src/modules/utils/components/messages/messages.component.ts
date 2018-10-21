import { Component, OnInit, Input } from '@angular/core'
import { Message } from '../../../../shared/models/message'
import { HappeningService } from '../../../../services/happening.service'
import { Happening } from '../../../../shared/models/happening'
import { MessageService } from '../../../../services/message.service'
import { UserService } from '../../../../services/user.service'
import { User } from '../../../../shared/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  responses: Message[] = []
  messages: Message[]

  @Input() happening: Happening

  constructor(
    private messageService: MessageService,
    private router: Router) {
  }

  ngOnInit() {
    this.getMessages()
  }

  getMessages() {
    this.messageService
    .getHappeningMessages(this.happening.id)
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
