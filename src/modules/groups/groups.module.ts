
import {NgModule} from '@angular/core'
import {GroupsComponent} from './components/groups/groups.component'
import {GroupsRoutingModule} from './routing/groups-routing.module'
import {MdIconModule, MdListModule} from '@angular/material'
import {CommonModule} from '@angular/common'

@NgModule({

  imports: [
    CommonModule,
    GroupsRoutingModule,
    MdIconModule,
    MdListModule,
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
