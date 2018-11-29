import { Component, OnInit, Input } from '@angular/core'
import { Message } from '../../../../../shared/models/message'
import { Router, ActivatedRoute, Params } from '@angular/router'

@Component({
  selector: 'app-message-footer',
  templateUrl: './message-footer.component.html',
  styleUrls: ['./message-footer.component.css']
})
export class MessageFooterComponent implements OnInit {
  private hideSeeAllButton = false
  @Input() message: Message

  constructor(
    private router: Router,
    private route: ActivatedRoute
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
    // TODO
  }

  goToMessageDetails() {
    this.router.navigate([`/events/${this.message.i7event}/messages/${this.message.id}`])
  }
}
