import {NgModule} from '@angular/core'
import {SettingsComponent} from './components/settings/settings.component'
import {SettingsRoutingModule} from './routing/settings-routing.module'
import {
  MdButtonModule, MdIconModule, MdListModule, MdMenuModule,
  MdProgressSpinnerModule,
  MdTableModule
} from '@angular/material'
import {FriendsModule} from '../friends/friends.module'
import {FriendsComponent} from '../friends/components/friends.component'
import {CommonModule} from '@angular/common'

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MdButtonModule,
    MdListModule,
    MdTableModule,
    MdMenuModule,
    MdIconModule,
    MdProgressSpinnerModule,
  ],
  declarations: [
    SettingsComponent,
  ],
  bootstrap: [SettingsComponent]
})
export class SettingsModule {
}
