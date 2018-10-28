import {Component, OnInit} from '@angular/core'
import { FormControl } from '@angular/forms'
import { RegistrationService } from '../../../../services/registration.service'
import { HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { PasswordRestorationService } from '../../../../services/password-restoration.service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css'],
})
export class RestorePasswordComponent implements OnInit {
  loading: boolean
  error: string
  emailFormControl: FormControl = new FormControl('')

  constructor(
    private passwordRestorationService: PasswordRestorationService,
    private router: Router) {}

  ngOnInit() {
  }

  onSubmit() {
    if (this.emailFormControl.invalid) {
      return
    }

    this.loading = true
    this.passwordRestorationService
    .restoreCreate(this.emailFormControl.value)
    .subscribe(
      () => this.router.navigate([`/account/restore-password-accepted`]),
      (err: HttpErrorResponse) => {
        if (err.error['email']) {
          this.error = err.error['email'].join(' ')
          this.emailFormControl.setErrors({backend: true})
          this.emailFormControl.markAsTouched()
          this.loading = false
        }
      }
    )
  }
}
