import { Component, OnInit } from '@angular/core'
import { User } from '../../../../shared/models/user'
import { ActivatedRoute, Router } from '@angular/router'
import { PasswordRestorationService } from '../../../../services/password-restoration.service'

@Component({
  selector: 'app-restore-password-success',
  templateUrl: './restore-password-success.component.html',
  styleUrls: ['./restore-password-success.component.css']
})
export class RestorePasswordSuccessComponent implements OnInit {
  user: User

  constructor(
    private passwordRestorationService: PasswordRestorationService
  ) { }

  ngOnInit() {
    this.passwordRestorationService.getUser().subscribe(user => this.user = user)
  }
}
