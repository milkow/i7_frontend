import {RouterModule, Routes} from '@angular/router'
import {NgModule} from '@angular/core'
import {SettingsComponent} from '../components/settings/settings.component'

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: SettingsComponent,
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SettingsRoutingModule {
}
