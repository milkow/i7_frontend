import {NgModule} from '@angular/core'
import {AccountComponent} from './components/account/account.component'
import {LogInComponent} from './components/log-in/log-in.component'
import {RegistrationComponent} from './components/registration/registration.component'
import {RegistrationCompleteComponent} from './components/registration-complete/registration-complete.component'
import {RestorePasswordComponent} from './components/restore-password/restore-password.component'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {
  MdButtonModule, MdDialog, MdDialogModule,
  MdInputModule
} from '@angular/material'
import {AccountRoutingModule} from './routing/account-routing.module'
import {CommonModule} from '@angular/common'
import {HeaderComponent} from './components/helpers/header/header.component'
import {RegistrationService} from '../../services/registration.service'
import {OVERLAY_PROVIDERS} from '@angular/material'
import {ActivationDialogComponent} from './components/helpers/activation-dialog/activation-dialog.component'

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    MdInputModule,
    MdButtonModule,
    MdDialogModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AccountComponent,
    RegistrationComponent,
    RegistrationCompleteComponent,
    RestorePasswordComponent,
    LogInComponent,
    HeaderComponent,
    ActivationDialogComponent,
  ],
  providers: [
    RegistrationService,
    OVERLAY_PROVIDERS,
    MdDialog,
  ],
  bootstrap: [
    AccountComponent
  ],
  entryComponents: [ActivationDialogComponent]
})
export class AccountModule {
}
