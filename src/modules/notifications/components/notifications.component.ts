import {Component} from '@angular/core'

export class Notif {
  id: number
  date: number
  avatar: string
  title: string
  content: string
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {

  notifications: Notif[] = [
    {
      id: 1,
      date: Date.UTC(2017, 8, 16, 12, 15),
      avatar: '/assets/event_covers/1.jpg',
      title: 'Stewart nevada international',
      content: 'Do you come here often? Where are my pants? Atoms can contain any character if they are enclosed within single quotes and an escape convention exists which allows any character to be used within an atom.',
    },
    {
      id: 2,
      date: Date.UTC(2017, 8, 16, 11, 44),
      avatar: '/assets/avatars/11.jpg',
      title: 'Enjoy or irish',
      content: 'Erlang is a general-purpose, concurrent, functional programming language. The arguments can be primitive data types or compound data types. He looked inquisitively at his keyboard and wrote another sentence. Atoms can contain any character if they are enclosed within single quotes and an escape convention exists which allows any character to be used within an atom.',
    },
    {
      id: 3,
      date: Date.UTC(2017, 8, 15, 17, 4),
      avatar: '/assets/avatars/8.jpg',
      title: 'Integrity generation put',
      content: 'It is also a garbage-collected runtime system. The sequential subset of Erlang supports eager evaluation, single assignment, and dynamic typing. The Galactic Empire is nearing completion of the Death Star, a space station with the power to destroy entire planets. She spent her earliest years reading classic literature, and writing poetry. Haskell features a type system with type inference and lazy evaluation. Where are my pants?',
    },
    {
      id: 4,
      date: Date.UTC(2017, 8, 13, 7, 29),
      avatar: '/assets/event_covers/5.jpg',
      title: 'Wholesale wrong lcd',
      content: 'Initially composing light-hearted and irreverent works, he also wrote serious, sombre and religious pieces beginning in the 1930s. Messages can be sent to and received from ports, but these messages must obey the so-called "port protocol." Tuples are containers for a fixed number of Erlang data types. She spent her earliest years reading classic literature, and writing poetry.',
    },
  ]

  hide(id: number): void {
      this.notifications = this.notifications.filter(
        e => e.id !== id)
  }

}
