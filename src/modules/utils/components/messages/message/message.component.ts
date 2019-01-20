import { Component, OnInit, Input} from '@angular/core'
import { Message } from '../../../../../shared/models/message'
import { MessageService } from '../../../../../services/message.service'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { User } from '../../../../../shared/models/user'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  private hideSeeAllButton = false
  private editMode: boolean
  private editedMessage: Message
  replyClicked: boolean
  currentUser: User
  displayMenu: boolean
  @Input() message: Message
  @Input() messageDetails = false
  @Input() showMenu = false
  @Input() removable = false
  @Input() editable = false

  constructor(
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(this.handleParams)
  }

  deleteMessage() {
    this.messageService.deleteMessage(this.message)
  }

  editMessage() {
    this.editMode = true
    this.editedMessage = {...this.message}
  }

  cancelEdit() {
    this.editMode = false
    this.editedMessage = null
  }

  saveMessage() {
    if (!this.editedMessage.body) {
      return
    }
    this.messageService.updateMessage(this.editedMessage).subscribe(() => {
      this.editMode = false
      this.message = this.editedMessage
    })
  }

  gotoUserProfile(id: string) {
    this.router.navigate([`/users/${id}`])
  }

  handleParams = (params: Params) => {
    if (params['messageId'] === this.message.id) {
      this.hideSeeAllButton = true
    }
  }

  handleVoteClick = () => {
    this.message.my_like
    ? this.messageService.handleMessageUnlike(this.message)
    : this.messageService.handleMessageLike(this.message)
  }

  goToMessageDetails() {
    this.router.navigate([`/events/${this.message.i7event}/messages/${this.message.id}`])
  }

  handleReplyClick() {
    this.message.replyClicked = !this.message.replyClicked
  }
}
