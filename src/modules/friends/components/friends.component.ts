import {Component} from '@angular/core'

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
})
export class FriendsComponent {
  friends = [
    {
      avatar: '/assets/avatars/1.jpg',
      username: 'jaquelyn_4082'
    },
    {
      avatar: '/assets/avatars/2.jpg',
      username: 'cherryl_3611'
    },
    {
      avatar: '/assets/avatars/3.jpg',
      username: 'dotty1496'
    },
    {
      avatar: '/assets/avatars/4.jpg',
      username: 'lanora5515'
    },
    {
      avatar: '/assets/avatars/5.jpg',
      username: 'sharika8063'
    },
  ]

  // People you may know
  pumks = [
    {
      avatar: '/assets/avatars/6.jpg',
      username: 'azucena-9656'
    },
    {
      avatar: '/assets/avatars/7.jpg',
      username: 'dionna9638'
    },
    {
      avatar: '/assets/avatars/8.jpg',
      username: 'setsuko9530'
    },
  ]
}
