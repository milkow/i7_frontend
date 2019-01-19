import { Component, OnInit } from '@angular/core'
import { UserService } from '../../../../services/user.service'
import { AuthorizationService } from '../../../../services/authorization.service'
import { MatDialog } from '@angular/material';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import {DeleteAccountDialogComponent} from '../delete-account-dialog/delete-account-dialog.component'

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
constructor(
    private userService: UserService,
    private authorizationService: AuthorizationService,
    private dialog: MatDialog) { }

  ngOnInit() {
  }

  changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '80%',
      maxWidth: '600px',
      height: '40vh',
      minHeight: '300px',
      maxHeight: '700px'
    })
  }

  logout() {
    this.authorizationService
      .logout()
      .subscribe(() => this.authorizationService.logoutConfirm())
  }

  deleteAccount = () => {
      this.dialog.open(DeleteAccountDialogComponent, {
        width: '80%',
        maxWidth: '600px',
        height: '40vh',
        minHeight: '300px',
        maxHeight: '700px',
      })
  }
}
