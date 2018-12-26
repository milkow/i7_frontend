import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {
  MatButtonModule, MatCardModule, MatIconModule, MatInputModule,
  MatListModule, MatProgressSpinnerModule, MatTabsModule
} from '@angular/material'
import {DashboardRoutingModule} from './routing/dashboard-routing.module'
import {DashboardComponent} from './components/dashboard.component'
import {UtilsModule} from '../utils/utils.module'
import { I7EventDetailsComponent } from '../i7events/components/i7event-details/i7event-details.component'
import { I7EventsModule } from '../i7events/i7events.module'

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    DashboardRoutingModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    UtilsModule,
    I7EventsModule
  ],
  declarations: [
    DashboardComponent,
  ],
  bootstrap: [DashboardComponent],
  entryComponents: [I7EventDetailsComponent]
})
export class DashboardModule {}
