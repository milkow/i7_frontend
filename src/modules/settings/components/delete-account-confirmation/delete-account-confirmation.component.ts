import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../services/user.service'
import {AuthorizationService} from '../../../../services/authorization.service'

@Component({
  selector: 'app-delete-account-confirmation',
  templateUrl: './delete-account-confirmation.component.html',
  styleUrls: ['./delete-account-confirmation.component.css']
})
export class DeleteAccountConfirmationComponent implements OnInit {
  pending = false

  constructor(private userService: UserService, private authService: AuthorizationService) {
  }

  ngOnInit() {
  }

  deleteAccount() {
    this.pending = true
    this.userService.deleteAccount().subscribe(this.logout)
  }

  logout = () => {
    this.authService.logout()
    this.authService.logoutConfirm()
    this.pending = false
  }


}
