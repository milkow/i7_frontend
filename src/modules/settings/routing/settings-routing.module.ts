import {RouterModule, Routes} from '@angular/router'
import {NgModule} from '@angular/core'
import {SettingsComponent} from '../components/settings/settings.component'
import {AuthoredEventsComponent} from '../components/authored-events/authored-events.component'

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: SettingsComponent,
      },
      {
        path: 'events',
        pathMatch: 'full',
        component: AuthoredEventsComponent,
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
