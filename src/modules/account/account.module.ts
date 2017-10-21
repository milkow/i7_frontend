import {NgModule} from '@angular/core'
import {AccountComponent} from './components/account/account.component'
import {LogInComponent} from './components/log-in/log-in.component'
import {RegistrationComponent} from './components/registration/registration.component'
import {RegistrationCompleteComponent} from './components/registration-complete/registration-complete.component'
import {RestorePasswordComponent} from './components/restore-password/restore-password.component'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {AccountRoutingModule} from './routing/account-routing.module'
import {CommonModule} from '@angular/common'
import {HeaderComponent} from './components/helpers/header/header.component'
import {RegistrationService} from '../../services/registration.service'
import {ActivationDialogComponent} from './components/helpers/activation-dialog/activation-dialog.component'
import {OVERLAY_PROVIDERS} from '@angular/cdk/overlay'
import {
  MatInputModule, MatDialogModule, MatButtonModule,
  MatDialog
} from '@angular/material'

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
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
    MatDialog,
  ],
  bootstrap: [
    AccountComponent
  ],
  entryComponents: [ActivationDialogComponent]
})
export class AccountModule {
}
