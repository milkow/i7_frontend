import {NgModule} from '@angular/core'
import {NotificationsRoutingModule} from './routing/notifications-routing.module'
import {NotificationsComponent} from './components/notifications.component'
import {CommonModule} from '@angular/common'
import {MdButtonModule, MdCardModule, MdListModule} from '@angular/material'

@NgModule({
  imports: [
    CommonModule,
    MdCardModule,
    MdListModule,
    MdButtonModule,
    NotificationsRoutingModule,
  ],
  declarations: [
    NotificationsComponent,
  ],
  bootstrap: [NotificationsComponent],
})
export class NotificationsModule {}
