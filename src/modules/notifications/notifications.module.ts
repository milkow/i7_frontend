import {NgModule} from '@angular/core'
import {NotificationsRoutingModule} from './routing/notifications-routing.module'
import {NotificationsComponent} from './components/notifications.component'

@NgModule({
  imports: [
    NotificationsRoutingModule,
  ],
  declarations: [
    NotificationsComponent,
  ],
  bootstrap: [NotificationsComponent],
})
export class NotificationsModule {}
