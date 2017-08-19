import {NgModule} from '@angular/core'
import {FrameComponent} from './components/frame/frame.component'
import {FrameRoutingModule} from './routing/happenings-routing.module'
import {MdButtonModule, MdIconModule, MdInputModule} from '@angular/material'

@NgModule({
  imports: [
    FrameRoutingModule,
    MdInputModule,
    MdIconModule,
    MdButtonModule,
  ],
  declarations: [
    FrameComponent,
  ],
  providers: [],
  bootstrap: [FrameComponent],
  entryComponents: [],
})
export class FrameModule {

}
