import {NgModule} from '@angular/core'
import {FrameComponent} from './components/frame/frame.component'
import {HappeningsRoutingModule} from '../happenings-routing/happenings-routing.module'
import {MdButtonModule, MdIconModule, MdInputModule} from '@angular/material'

@NgModule({
  imports: [
    HappeningsRoutingModule,
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
export class HappeningsModule {

}