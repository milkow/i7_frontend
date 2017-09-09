import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {
  MdButtonModule, MdCardModule, MdIconModule, MdInputModule,
  MdListModule
} from '@angular/material'
import {DashboardRoutingModule} from './routing/dashboard-routing.module'
import {DashboardComponent} from './components/dashboard.component'
import {UtilsModule} from '../utils/utils.module'

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdCardModule,
    MdListModule,
    MdIconModule,

    DashboardRoutingModule,

    UtilsModule,
  ],
  declarations: [
    DashboardComponent,
  ],
  bootstrap: [DashboardComponent]
})
export class DashboardModule {}
