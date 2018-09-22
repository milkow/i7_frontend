import {NgModule} from '@angular/core'
import {ExploreComponent} from './components/explore/explore.component'
import {ExploreRoutingModule} from './routing/explore-routing.module'
import {MatButtonModule, MatIconModule, MatDialogModule} from '@angular/material'
import { UtilsModule } from '../utils/utils.module'
import { EventCreateComponent } from '../events/event-create/event-create.component';
import { EventsModule } from '../events/events.module';

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
  entryComponents: [EventCreateComponent],
})
export class ExploreModule {
}
