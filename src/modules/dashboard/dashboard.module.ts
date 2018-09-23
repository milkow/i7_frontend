import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {
  MatButtonModule, MatCardModule, MatIconModule, MatInputModule,
  MatListModule, MatProgressSpinnerModule
} from '@angular/material'
import {DashboardRoutingModule} from './routing/dashboard-routing.module'
import {DashboardComponent} from './components/dashboard.component'
import {UtilsModule} from '../utils/utils.module'

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
  ],
  declarations: [
    DashboardComponent,
  ],
  bootstrap: [DashboardComponent]
})
export class DashboardModule {}
