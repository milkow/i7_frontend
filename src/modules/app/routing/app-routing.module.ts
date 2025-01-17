import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {PageNotFoundComponent} from '../components/page-not-found/page-not-found'

const routes: any = [
  {path: 'account', loadChildren: './../../account/account.module#AccountModule'},
  {path: '', loadChildren: './../../frame/frame.module#FrameModule'},
  {path: '**', component: PageNotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {enableTracing: false}
  )],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
