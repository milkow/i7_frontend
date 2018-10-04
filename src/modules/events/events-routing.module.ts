import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { EventCreateComponent } from './event-create/event-create.component'
import { EventDetailsComponent } from './event-details/event-details.component'

const routes: Routes = [
  {
    path: 'create',
    component: EventCreateComponent
  },
  {
    path: ':id',
    component: EventDetailsComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
