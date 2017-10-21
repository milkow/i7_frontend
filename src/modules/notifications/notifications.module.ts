import {NgModule} from '@angular/core'
import {NotificationsRoutingModule} from './routing/notifications-routing.module'
import {NotificationsComponent} from './components/notifications.component'
import {CommonModule} from '@angular/common'
import {
  MdButtonModule, MdCardModule, MdListModule,
  MdProgressSpinnerModule
} from '@angular/material'
import {UtilsModule} from '../utils/utils.module'

@NgModule({
  imports: [
    CommonModule,
    MdCardModule,
    MdListModule,
    MdButtonModule,
    NotificationsRoutingModule,
    MdProgressSpinnerModule,
    UtilsModule,
  ],
  declarations: [
    NotificationsComponent,
  ],
  bootstrap: [NotificationsComponent],
})
export class NotificationsModule {}
