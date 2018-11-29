import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { MessageService } from '../../../../../services/message.service'
import { Message } from '../../../../../shared/models/message'
import { pipe } from 'rxjs';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.css']
})
export class MessageDetailsComponent implements OnInit {
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

  handleRouteParams = (params: Params) => {
    if (!this.validateParams(params)) {
      return
    }

    this.i7eventId = params['id']
    this.messageId = params['messageId']

    this.getMessage()
  }

  assignMessage = (msg: Message) => this.message = msg

  validateParams = (params: Params): boolean => {
    if (!params['id'] || ! params['messageId']) {
      return false
    }
    return true
  }

  getResponses = (msg: Message) => {
    this.messageService.getResponses(msg).subscribe(responses => this.responses = responses)
  }

  getMessage = () => {
    this.messageService.getMessage(this.i7eventId, this.messageId).subscribe(pipe(this.assignMessage, this.getResponses))
  }
}
