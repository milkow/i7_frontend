import {NgModule} from '@angular/core'
import {ExploreComponent} from './components/explore/explore.component'
import {ExploreRoutingModule} from './routing/explore-routing.module'
import {MatButtonModule, MatIconModule, MatDialogModule} from '@angular/material'
import { UtilsModule } from '../utils/utils.module'
import { I7EventsModule } from '../i7events/i7events.module'
import { I7EventDetailsComponent } from '../i7events/components/i7event-details/i7event-details.component'

@NgModule({
  imports: [
    ExploreRoutingModule,
    MatIconModule,
    MatButtonModule,
    UtilsModule,
    MatDialogModule,
    I7EventsModule
  ],
  declarations: [
    ExploreComponent
  ],
  providers: [],
  bootstrap: [],
  entryComponents: [I7EventDetailsComponent],
})
export class ExploreModule {
}
