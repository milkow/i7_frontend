import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {PageNotFoundComponent} from '../components/page-not-found/page-not-found'
import {AccountModule} from '../../account/account.module'
import {HappeningsModule} from '../../happenings/happenings.module'

const routes: any = [
  {path: 'account', loadChildren: './../account/account.module#AccountModule'},
  {path: 'happenings', loadChildren: './../happenings/happenings.module#HappeningsModule'},
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
