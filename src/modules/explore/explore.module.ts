import {NgModule} from '@angular/core'
import {ExploreComponent} from './components/explore/explore.component'
import {ExploreRoutingModule} from './routing/explore-routing.module'
import {MdButtonModule, MdIconModule} from '@angular/material'

@NgModule({
  imports: [
    ExploreRoutingModule,
    MdIconModule,
    MdButtonModule,
  ],
  declarations: [
    ExploreComponent
  ],
  providers: [],
  bootstrap: [],
  entryComponents: [],
})
export class ExploreModule {
}
