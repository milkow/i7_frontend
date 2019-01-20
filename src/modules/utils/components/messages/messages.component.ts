import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { Message } from '../../../../shared/models/message'
import { I7Event } from '../../../../shared/models/i7event'
import { MessageService } from '../../../../services/message.service'
import { Router } from '@angular/router'
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../shared/models/user';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {
  user: User
  messages: Message[] = []

  @Input() i7event: I7Event

  constructor(
    private messageService: MessageService,
    private router: Router,
    private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => this.user = user)
    this.messageService.startListening(this.i7event.id)
    this.messageService.getEventMessages(this.i7event.id).subscribe(messages => this.messages = messages)
  }

  ngOnDestroy() {
    this.messageService.stopListening()
  }

  gotoUserProfile(id: string) {
    this.router.navigate([`/users/${id}`])
  }

  getEditPrivilege(message: Message) {
    if (!message.author) {
      return false
    }

    if (message.author.id === this.user.id) {
      return true
    }

    return false
  }

  getDeletePrivilege(message: Message) {
    if (!message.author) {
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
