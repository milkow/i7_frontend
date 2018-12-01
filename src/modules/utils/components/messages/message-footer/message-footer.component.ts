import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core'
import { Message } from '../../../../../shared/models/message'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { MessageService } from '../../../../../services/message.service'

@Component({
  selector: 'app-message-footer',
  templateUrl: './message-footer.component.html',
  styleUrls: ['./message-footer.component.css']
})
export class MessageFooterComponent implements OnInit {
  @ViewChild('create') private myScrollContainer: ElementRef

  private hideSeeAllButton = false
  @Input() message: Message

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(this.handleParams)
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
