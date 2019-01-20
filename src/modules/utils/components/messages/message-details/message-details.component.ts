import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { MessageService } from '../../../../../services/message.service'
import { Message } from '../../../../../shared/models/message'
import { pipe } from 'rxjs'
import { User } from '../../../../../shared/models/user';
import { UserService } from '../../../../../services/user.service';
import { I7EventService } from '../../../../../services/i7event.service';
import { I7Event } from '../../../../../shared/models/i7event';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.css']
})
export class MessageDetailsComponent implements OnInit, OnDestroy {
  user: User
  i7eventId: string
  i7event: I7Event
  messageId: string
  message: Message
  responses: Message[] = []

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private userService: UserService,
    private eventService: I7EventService
  ) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => this.user = user)
    this.route.params.subscribe(this.handleRouteParams)
  }

  ngOnDestroy() {
    this.messageService.stopListening()
  }

  handleRouteParams = (params: Params) => {
    if (!this.validateParams(params)) {
      return
    }

    this.i7eventId = params['id']
    this.messageId = params['messageId']

    this.messageService.startListening(this.i7eventId)
    this.eventService.get(params['id']).subscribe(event => this.i7event = event)
    this.messageService.getMessageWithResponses(this.i7eventId, this.messageId).subscribe(this.assignMessages)
  }

  validateParams = (params: Params): boolean => {
    if (!params['id'] || ! params['messageId']) {
      return false
    }
    return true
  }

  assignMessages = (messages: Message[]) => {
    this.message = messages[0]
    this.responses = messages.slice(1)
  }

  getEditPrivilege(message: Message) {
    if (!message || !message.author || !this.user) {
      return false
    }

    if (message.author.id === this.user.id) {
      return true
    }

    return false
  }

  getDeletePrivilege(message: Message) {
    if (!message || !message.author || !this.user) {
      return false
    }

    if (this.i7event.author.id === this.user.id) {
      return true
    }

    if (message.author.id === this.user.id) {
      return true
    }

    return false
  }
}
