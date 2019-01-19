import {RouterModule, Routes} from '@angular/router'
import {NgModule} from '@angular/core'
import {SettingsComponent} from '../components/settings/settings.component'
import {AuthoredEventsComponent} from '../components/authored-events/authored-events.component'
import { AccountSettingsComponent } from '../components/account-settings/account-settings.component';
import {DeleteAccountComponent} from '../components/delete-account/delete-account.component'
import {DeleteAccountConfirmationComponent} from '../components/delete-account-confirmation/delete-account-confirmation.component'

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
      },
      {
        path: 'account',
        pathMatch: 'full',
        component: AccountSettingsComponent
      },
      {
        path: 'delete-account',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: DeleteAccountComponent,
          },
          {
            path: 'confirm',
            component: DeleteAccountConfirmationComponent,
          }
        ]
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
