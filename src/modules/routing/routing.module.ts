import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {PageNotFoundComponent} from '../app/components/page-not-found/page-not-found'
import {AccountModule} from '../account/account.module'

const routes: Routes = [
  {path: 'account', loadChildren: () => AccountModule},
  {path: '**', component: PageNotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {enableTracing: true}
  )],
  exports: [RouterModule],
})
export class RoutingModule {

}
