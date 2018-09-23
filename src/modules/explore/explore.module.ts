import {NgModule} from '@angular/core'
import {ExploreComponent} from './components/explore/explore.component'
import {ExploreRoutingModule} from './routing/explore-routing.module'
import {MatButtonModule, MatIconModule, MatDialogModule} from '@angular/material'
import { UtilsModule } from '../utils/utils.module'
import { EventsModule } from '../events/events.module'
import { EventDetailsComponent } from '../events/event-details/event-details.component';

@NgModule({
  imports: [
    ExploreRoutingModule,
    MatIconModule,
    MatButtonModule,
    UtilsModule,
    MatDialogModule,
    EventsModule
  ],
  declarations: [
    ExploreComponent
  ],
  providers: [],
  bootstrap: [],
  entryComponents: [EventDetailsComponent],
})
export class ExploreModule {
}
