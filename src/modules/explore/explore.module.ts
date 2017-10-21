import {NgModule} from '@angular/core'
import {ExploreComponent} from './components/explore/explore.component'
import {ExploreRoutingModule} from './routing/explore-routing.module'
import {MatButtonModule, MatIconModule} from '@angular/material'

@NgModule({
  imports: [
    ExploreRoutingModule,
    MatIconModule,
    MatButtonModule,
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
