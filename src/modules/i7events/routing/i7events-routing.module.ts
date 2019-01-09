import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { I7EventCreateComponent } from '../components/i7event-create/i7event-create.component'
import { I7EventDetailsComponent } from '../components/i7event-details/i7event-details.component'
import { I7EventUsersComponent } from '../components/i7event-users/i7event-users.component'
import { I7EventPhotosComponent } from '../components/i7event-photos/i7event-photos.component'
import { I7EventLocationComponent } from '../components/i7-event-location/i7-event-location.component'
import { MessageDetailsComponent } from '../../utils/components/messages/message-details/message-details.component'
import { I7EventSettingsComponent } from '../components/i7-event-settings/i7-event-settings.component';

const routes: Routes = [
  {
    path: 'create',
    component: I7EventCreateComponent
  },
  {
    path: 'set-location',
    component: I7EventLocationComponent
  },
  {
    path: ':id/settings',
    component: I7EventSettingsComponent
  },
  {
    path: ':id',
    component: I7EventDetailsComponent
  },
  {
    path: ':id/description',
    component: I7EventDetailsComponent
  },
  {
    path: ':id/users',
    component: I7EventUsersComponent
  },
  {
    path: ':id/photos',
    component: I7EventPhotosComponent
  },
  {
    path: ':id/messages/:messageId',
    component: MessageDetailsComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
