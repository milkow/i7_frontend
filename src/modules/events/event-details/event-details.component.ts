import { Component, OnInit, Inject } from '@angular/core'
import { Happening } from '../../../shared/models/happening'
import { MAT_DIALOG_DATA } from '@angular/material'
import { Message } from '../../../shared/models/message'
import { HappeningService } from '../../../services/happening.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  happening: Happening
  messages: Message[]

  happenings_conversations = [
    {
      avatar: '/assets/happening_covers/1.jpg',
      name: 'Kayaking',
      from: 'Kelly',
      content: 'Tuples are containers for a fixed number of Erlang data types.',
    },
    {
      avatar: '/assets/happening_covers/2.jpg',
      name: 'Jazz nigth',
      from: 'Jöran',
      content: 'I don\'t even care.',
    },
    {
      avatar: '/assets/happening_covers/3.jpg',
      name: 'Rock NOW',
      from: 'Tomás',
      content: 'The syntax {D1,D2,...,Dn} denotes a tuple whose arguments are D1, D2, ... Dn.',
    },
    {
      avatar: '/assets/happening_covers/4.jpg',
      name: 'Lovely skating',
      from: 'Lucien',
      content: 'It is also a garbage-collected runtime system.',
    },
    {
      avatar: '/assets/happening_covers/5.jpg',
      name: 'Tor in New York',
      from: 'Tor',
      content: 'Haskell features a type system with type inference and lazy evaluation.',
    },
  ]

  constructor(@Inject(MAT_DIALOG_DATA) data, private happeningService: HappeningService) {
    this.happening = data.happ
  }

  ngOnInit() {
  }
}

