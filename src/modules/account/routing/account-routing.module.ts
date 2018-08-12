import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {AccountComponent} from '../components/account/account.component'
import {LogInComponent} from '../components/log-in/log-in.component'
import {RegistrationComponent} from '../components/registration/registration.component'
import {RegistrationCompleteComponent} from '../components/registration-complete/registration-complete.component'
import {RestorePasswordComponent} from '../components/restore-password/restore-password.component'
import {OAuth2AuthorizeComponent} from '../components/oauth2-authorize/o-auth2-authorize.component'
import {OAuth2LogInComponent} from '../components/oauth2-log-in/o-auth2-log-in.component'


const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'log-in',
      },
      {
        path: 'log-in',
        component: LogInComponent,
        data: {
          post_register: false
        }
      },
      {
        path: 'oauth2/log-in',
        component: OAuth2LogInComponent,
      },
      {
        path: 'oauth2/authorize',
        component: OAuth2AuthorizeComponent,
      },
      {
        path: 'registration',
        component: RegistrationComponent,
      },
      {
        path: 'registration/:id',
        component: RegistrationCompleteComponent,
      },
      {
        path: 'restore-password',
        component: RestorePasswordComponent,
      },
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AccountRoutingModule {

}
