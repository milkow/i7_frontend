import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {
  MatButtonModule, MatCardModule, MatIconModule, MatInputModule,
  MatListModule, MatProgressSpinnerModule
} from '@angular/material'
import {DashboardRoutingModule} from './routing/dashboard-routing.module'
import {DashboardComponent} from './components/dashboard.component'
import {UtilsModule} from '../utils/utils.module'
import { EventDetailsComponent } from '../events/event-details/event-details.component';
import { EventsModule } from '../events/events.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    DashboardRoutingModule,
    MatProgressSpinnerModule,
    UtilsModule,
    EventsModule
  ],
  declarations: [
    DashboardComponent,
  ],
  bootstrap: [DashboardComponent],
  entryComponents: [EventDetailsComponent]
})
export class DashboardModule {}
