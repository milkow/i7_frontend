import {NgModule} from '@angular/core'
import {ExploreComponent} from './components/explore/explore.component'
import {ExploreRoutingModule} from './routing/explore-routing.module'
import {MatButtonModule, MatIconModule} from '@angular/material'
import { UtilsModule } from '../utils/utils.module'

@NgModule({
  imports: [
    ExploreRoutingModule,
    MatIconModule,
    MatButtonModule,
    UtilsModule
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
