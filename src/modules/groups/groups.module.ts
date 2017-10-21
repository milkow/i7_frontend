
import {NgModule} from '@angular/core'
import {GroupsComponent} from './components/groups/groups.component'
import {GroupsRoutingModule} from './routing/groups-routing.module'
import {
  MdButtonModule, MdIconModule, MdListModule,
  MdProgressSpinnerModule
} from '@angular/material'
import {CommonModule} from '@angular/common'
import {UtilsModule} from '../utils/utils.module'

@NgModule({

  imports: [
    CommonModule,
    GroupsRoutingModule,
    MdIconModule,
    MdListModule,
    MdButtonModule,
    MdProgressSpinnerModule,

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
