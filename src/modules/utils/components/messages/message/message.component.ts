import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Message } from '../../../../../shared/models/message'
import { MessageService } from '../../../../../services/message.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  replyClicked: boolean
  @Input() message: Message

  constructor(
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  delete() {
    this.messageService.deleteMessage(this.message)
  }

  gotoUserProfile(id: string) {
    this.router.navigate([`/users/${id}`])
  }
}
