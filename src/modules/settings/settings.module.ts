import {NgModule} from '@angular/core'
import {SettingsComponent} from './components/settings/settings.component'
import {SettingsRoutingModule} from './routing/settings-routing.module'
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule
} from '@angular/material'
import {CommonModule} from '@angular/common'
import {UtilsModule} from '../utils/utils.module';
import { ProfileAlbumComponent } from './components/profile-album/profile-album.component';
import { AuthoredEventsComponent } from './components/authored-events/authored-events.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';
import { DeleteAccountConfirmationComponent } from './components/delete-account-confirmation/delete-account-confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatMenuModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    UtilsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  declarations: [
    SettingsComponent,
    ProfileAlbumComponent,
    AuthoredEventsComponent,
    AccountSettingsComponent,
    ChangePasswordComponent,
    DeleteAccountComponent,
    DeleteAccountConfirmationComponent,
  ],
  bootstrap: [SettingsComponent, ChangePasswordComponent],
  entryComponents: [ChangePasswordComponent]
})
export class SettingsModule {
}
