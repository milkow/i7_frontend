import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { UserService } from '../../../../../services/user.service'
import { MessageService } from '../../../../../services/message.service'
import { Message } from '../../../../../shared/models/message'
import { User } from '../../../../../shared/models/user'
import { Router } from '@angular/router'

@Component({
  selector: 'app-message-create',
  templateUrl: './message-create.component.html',
  styleUrls: ['./message-create.component.css']
})
export class MessageCreateComponent implements OnInit {
  @Input() eventId: string
  @Input() inResponseTo: string

  currentUser: User
  newMessage: Message

  constructor(
    public userService: UserService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit() {
    this.initMessage()

    this.userService
    .getCurrentUser()
    .subscribe(user => {
      this.currentUser = user
    })
  }

  sendMessage() {
    if (!this.newMessage.body) {
      return
    }

    this.messageService
    .sendMessage(this.newMessage)
    .subscribe(msg => {
      this.initMessage()
    })
  }

  initMessage() {
    this.newMessage = new Message({
      body: '',
      in_response_to: this.inResponseTo,
      event: this.eventId
    })
  }

  gotoUserProfile() {
    this.router.navigate([`/users/me`])
  }
}
