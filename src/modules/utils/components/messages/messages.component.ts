import { Component, OnInit, Input } from '@angular/core'
import { Message } from '../../../../shared/models/message'
import { I7Event } from '../../../../shared/models/i7event'
import { MessageService } from '../../../../services/message.service'
import { Router } from '@angular/router'
import { pipe } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[] = []

  @Input() i7event: I7Event

  constructor(
    private messageService: MessageService,
    private router: Router) {
  }

  ngOnInit() {
    this.messageService.getEventMessages(this.i7event.id).subscribe(pipe(this.assignMessages, this.sortByDate))
  }

  assignMessages = (messages: Message[]) => this.messages = messages

  gotoUserProfile(id: string) {
    this.router.navigate([`/users/${id}`])
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
}
