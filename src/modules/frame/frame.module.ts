import {NgModule} from '@angular/core'
import {FrameComponent} from './components/frame/frame.component'
import {FrameRoutingModule} from './routing/happenings-routing.module'
import {MdButtonModule, MdIconModule, MdInputModule} from '@angular/material'
import {NavigationComponent} from './components/navigation/navigation.component'
import {NavigationMobileComponent} from './components/navigation-mobile/navigation-mobile.component'
import {NavigationPcComponent} from './components/navigation-pc/navigation-pc.component'


@NgModule({
  imports: [
    FrameRoutingModule,
    MdInputModule,
    MdIconModule,
    MdButtonModule,
  ],
  declarations: [
    FrameComponent,
    NavigationComponent,
    NavigationMobileComponent,
    NavigationPcComponent,
  ],
  providers: [],
  bootstrap: [FrameComponent],
  entryComponents: [],
})
export class FrameModule {

}
