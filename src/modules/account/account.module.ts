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
import {OverlayModule} from '@angular/cdk/overlay'
import {MatButtonModule, MatDialog, MatDialogModule, MatInputModule} from '@angular/material'
import {OAuth2AuthorizeComponent} from './components/oauth2-authorize/o-auth2-authorize.component'
import {AuthorizationService} from '../../services/authorization.service'
import {LoggerModule} from 'ngx-logger'
import {HttpClientModule} from '@angular/common/http'
import {OAuth2LogInComponent} from './components/oauth2-log-in/o-auth2-log-in.component'

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoggerModule.forRoot(null),
  ],
  declarations: [
    AccountComponent,
    RegistrationComponent,
    RegistrationCompleteComponent,
    RestorePasswordComponent,
    LogInComponent,
    HeaderComponent,
    ActivationDialogComponent,
    OAuth2AuthorizeComponent,
    OAuth2LogInComponent,
  ],
  providers: [
    RegistrationService,
    OverlayModule,
    MatDialog,
    AuthorizationService,
  ],
  bootstrap: [
    AccountComponent
  ],
  entryComponents: [ActivationDialogComponent]
})
export class AccountModule {
}
