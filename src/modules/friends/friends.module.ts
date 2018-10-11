import {NgModule} from '@angular/core'
import {FriendsComponent} from './components/friends/friends.component'
import {FriendsRoutingModule} from './routing/friends-routing.module'
import {MatButtonModule, MatIconModule, MatListModule, MatExpansionModule,
  MatInputModule, MatFormFieldModule, MatBadgeModule} from '@angular/material'
import {CommonModule} from '@angular/common'
import { FriendRequestsComponent } from './components/friend-requests/friend-requests.component'
import { UtilsModule } from '../utils/utils.module'
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FriendsRoutingModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatExpansionModule,
    UtilsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatBadgeModule
  ],
  declarations: [
    FriendsComponent,
    FriendRequestsComponent,
  ]
})
export class FriendsModule {
}
