import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {PageNotFoundComponent} from '../components/page-not-found/page-not-found'
import {AccountModule} from '../../account/account.module'
import {FrameModule} from '../../frame/frame.module'

const routes: any = [
  {path: 'account', loadChildren: './../../account/account.module#AccountModule'},
  {path: '', loadChildren: './../../frame/frame.module#FrameModule'},
  {path: '**', component: PageNotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {enableTracing: true}
  )],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
