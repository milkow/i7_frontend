import {NgModule} from '@angular/core'
import {FriendsComponent} from './components/friends.component'
import {FriendsRoutingModule} from './routing/friends-routing.module'
import {MdButtonModule, MdIconModule, MdListModule} from '@angular/material'
import {CommonModule} from '@angular/common'

@NgModule({
  imports: [
    CommonModule,
    FriendsRoutingModule,
    MdIconModule,
    MdListModule,
    MdButtonModule,
  ],
  declarations: [
    FriendsComponent,
  ]
})
export class FriendsModule {
}
