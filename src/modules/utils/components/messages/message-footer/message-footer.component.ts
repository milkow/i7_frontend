import { Component, OnInit, Input } from '@angular/core'
import { Message } from '../../../../../shared/models/message'
import { Router } from '@angular/router'

@Component({
  selector: 'app-message-footer',
  templateUrl: './message-footer.component.html',
  styleUrls: ['./message-footer.component.css']
})
export class MessageFooterComponent implements OnInit {

  @Input() message: Message

  constructor(private router: Router) { }

  ngOnInit() {
  }

  handleVoteClick = () => {
    // TODO
  }

  goToMessageDetails() {
    this.router.navigate([`/events/${this.message.i7event}/messages/${this.message.id}`])
  }
}
