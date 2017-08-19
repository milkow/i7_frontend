import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {FrameComponent} from '../components/frame/frame.component'

const routes: Routes = [
  {
    path: '',
    component: FrameComponent,
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HappeningsRoutingModule {

}
