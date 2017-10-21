
import {NgModule} from '@angular/core'
import {GroupsComponent} from './components/groups/groups.component'
import {GroupsRoutingModule} from './routing/groups-routing.module'
import {
  MatButtonModule, MatIconModule, MatListModule,
  MatProgressSpinnerModule
} from '@angular/material'
import {CommonModule} from '@angular/common'
import {UtilsModule} from '../utils/utils.module'

@NgModule({

  imports: [
    CommonModule,
    GroupsRoutingModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatProgressSpinnerModule,

    UtilsModule,
  ],
  declarations: [
    GroupsComponent,
  ],
  providers: [],
  bootstrap: [],
  entryComponents: [],
})
export class GroupsModule {
}
