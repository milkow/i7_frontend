import {NgModule} from '@angular/core'
import {AccountComponent} from './components/account/account.component'
import {LogInComponent} from './components/log-in/log-in.component'
import {RegistrationComponent} from './components/registration/registration.component'
import {RegistrationCompleteComponent} from './components/registration-complete/registration-complete.component'
import {RestorePasswordComponent} from './components/restore-password/restore-password.component'
import {AccountRoutingModule} from '../account-routing/account-routing.module'

@NgModule({
  imports: [
    AccountRoutingModule,
  ],
  declarations: [
    AccountComponent,
    LogInComponent,
    RegistrationComponent,
    RegistrationCompleteComponent,
    RestorePasswordComponent,
  ],
  providers: [],
  bootstrap: [
    AccountComponent
  ],
})
export class AccountModule {

}
