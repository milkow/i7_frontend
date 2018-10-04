import { Component, OnInit, Inject, Input } from '@angular/core'
import { Happening } from '../../../shared/models/happening'
import { Message } from '../../../shared/models/message'
import { ActivatedRoute } from '@angular/router';
import { HappeningService } from '../../../services/happening.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  messages: Message[]
  @Input() happening: Happening

  constructor(private route: ActivatedRoute, private happeningService: HappeningService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (!params['id']) {
        return
      }

      this.happeningService.getHappening(params['id']).subscribe(happ => {
        this.happening = happ
      })
    })
  }
}

