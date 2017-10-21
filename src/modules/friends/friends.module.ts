import {NgModule} from '@angular/core'
import {FriendsComponent} from './components/friends.component'
import {FriendsRoutingModule} from './routing/friends-routing.module'
import {MatButtonModule, MatIconModule, MatListModule} from '@angular/material'
import {CommonModule} from '@angular/common'

@NgModule({
  imports: [
    CommonModule,
    FriendsRoutingModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
  ],
  declarations: [
    FriendsComponent,
  ]
})
export class FriendsModule {
}
