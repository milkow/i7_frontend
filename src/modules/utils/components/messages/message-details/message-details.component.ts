import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { MessageService } from '../../../../../services/message.service'
import { Message } from '../../../../../shared/models/message'
import { pipe } from 'rxjs'

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.css']
})
export class MessageDetailsComponent implements OnInit, OnDestroy {
  i7eventId: string
  messageId: string
  message: Message
  responses: Message[] = []

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit() {
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
}
