
import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {FriendsComponent} from '../components/friends.component'
import { FriendRequestsComponent } from '../components/friend-requests/friend-requests.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: FriendsComponent,
      },
      {
        path: 'requests',
        component: FriendRequestsComponent
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FriendsRoutingModule {}
