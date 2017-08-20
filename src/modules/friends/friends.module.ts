import {NgModule} from '@angular/core'
import {FriendsComponent} from './components/friends.component'
import {FriendsRoutingModule} from './routing/friends-routing.module'

@NgModule({
  imports: [
    FriendsRoutingModule,
  ],
  declarations: [
    FriendsComponent,
  ]
})
export class FriendsModule {}
