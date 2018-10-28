import {Component} from '@angular/core'


@Component({
  selector: 'app-groups',
  templateUrl: 'groups.component.html',
  styleUrls: ['./groups.component.css'],
})
export class GroupsComponent {

  RecentType = {
    FRIEND: 'FRIEND',
    EVENT: 'EVENT',
  }

  recent = [
    {
      type: this.RecentType.FRIEND,
      avatar: '/assets/avatars/1.jpg',
      from: 'Llewellyn',
      content: 'Make me a sandwich.'
    },
    {
      type: this.RecentType.EVENT,
      from: 'Party on the beach',
      avatar: '/assets/event_covers/6.jpg',
      content: 'She spent her earliest years reading classic literature, and writing poetry.'
    },
    {
      type: this.RecentType.EVENT,
      from: 'Coffee with Karol',
      avatar: '/assets/event_covers/7.jpg',
      content: 'The arguments can be primitive data types or compound data types.'
    },
  ]

  events_conversations = [
    {
      avatar: '/assets/event_covers/1.jpg',
      name: 'Kayaking',
      from: 'Kelly',
      content: 'Tuples are containers for a fixed number of Erlang data types.',
    },
    {
      avatar: '/assets/event_covers/2.jpg',
      name: 'Jazz nigth',
      from: 'Jöran',
      content: 'I don\'t even care.',
    },
    {
      avatar: '/assets/event_covers/3.jpg',
      name: 'Rock NOW',
      from: 'Tomás',
      content: 'The syntax {D1,D2,...,Dn} denotes a tuple whose arguments are D1, D2, ... Dn.',
    },
    {
      avatar: '/assets/event_covers/4.jpg',
      name: 'Lovely skating',
      from: 'Lucien',
      content: 'It is also a garbage-collected runtime system.',
    },
    {
      avatar: '/assets/event_covers/5.jpg',
      name: 'Tor in New York',
      from: 'Tor',
      content: 'Haskell features a type system with type inference and lazy evaluation.',
    },
  ]

  friends_conversations = [
    {
      name: 'Deion Mahavir',
      avatar: '/assets/avatars/3.jpg',
      content: 'They are written as strings of consecutive alphanumeric characters, the first character being lowercase.',
    },
    {
      name: 'Amund Caron',
      avatar: '/assets/avatars/4.jpg',
      content: 'They are written as strings of consecutive alphanumeric characters, the first character being lowercase.',
    },
    {
      name: 'Norman Deon',
      avatar: '/assets/avatars/5.jpg',
      content: 'Where are my pants?',
    },
    {
      name: 'Arash Whitney',
      avatar: '/assets/avatars/6.jpg',
      content: 'Initially composing light-hearted and irreverent works, he also wrote serious, sombre and religious pieces beginning in the 1930s.',
    },
    {
      name: 'Rajendra Yoshiro',
      avatar: '/assets/avatars/7.jpg',
      content: 'Atoms can contain any character if they are enclosed within single quotes and an escape convention exists which allows any character to be used within an atom.',
    },
  ]

}
