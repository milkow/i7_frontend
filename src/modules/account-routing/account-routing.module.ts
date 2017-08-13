import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {AccountComponent} from '../account/components/account/account.component'
import {LogInComponent} from '../account/components/log-in/log-in.component'
import {RegistrationComponent} from '../account/components/registration/registration.component'
import {RegistrationCompleteComponent} from '../account/components/registration-complete/registration-complete.component'
import {RestorePasswordComponent} from '../account/components/restore-password/restore-password.component'


const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: 'log-in',
        component: LogInComponent,
      },
      {
        path: 'registration',
        component: RegistrationComponent,
      },
      {
        path: 'registration-complete',
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
