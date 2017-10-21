import {NgModule} from '@angular/core'
import {NotificationsRoutingModule} from './routing/notifications-routing.module'
import {NotificationsComponent} from './components/notifications.component'
import {CommonModule} from '@angular/common'
import {
  MatButtonModule, MatCardModule, MatListModule,
  MatProgressSpinnerModule
} from '@angular/material'
import {UtilsModule} from '../utils/utils.module'

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    NotificationsRoutingModule,
    MatProgressSpinnerModule,
    UtilsModule,
  ],
  declarations: [
    NotificationsComponent,
  ],
  bootstrap: [NotificationsComponent],
})
export class NotificationsModule {}
