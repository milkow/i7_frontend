import { Component, OnInit } from '@angular/core'
import { Form, FormControl, Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms'
import { PasswordValidation } from '../../../utils/validators/password'
import { RegisterAccountUser } from '../../../../shared/models/register-account-user'
import { HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { NotificationService } from '../../../../services/notification.service';
import { RegistrationService } from '../../../../services/registration.service';
import { NotificationType } from '../../../../shared/models/notification';
import * as Constants from '../../../../shared/constants'
import { BaseApiError } from '../../../utils/BaseApiError';

class RegisterAccountUserError extends BaseApiError {
  username: string
  email: string
  password: string
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  error: RegisterAccountUserError
  form: FormGroup

  constructor(
    private builder: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password1: new FormControl('', [Validators.required, Validators.minLength(3)])
    },
      { validator: PasswordValidation.MatchPassword })
  }

  submitForm() {
    if (!this.form.valid) {
      return
    }

    const user = new RegisterAccountUser({
      username: this.form.controls.username.value,
      email: this.form.controls.email.value,
      password: this.form.controls.password.value
    })

    this.registrationService.register(user).subscribe(data => {
      this.router.navigate([`/account/log-in`])
      this.notificationService.push({
        type: NotificationType.Success,
        text: Constants.accountCreated
      })
    }, (err: HttpErrorResponse) => {
      this.error = this.getError(err)
      this.setErrors(this.error, this.form)
    })
  }

  setErrors(error: any, formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      if (error[key]) {
        formGroup.controls[key].setErrors({backend: true})
        formGroup.controls[key].markAsTouched()
      }
    })
  }

  getError<T extends BaseApiError>(error: HttpErrorResponse): T {
    const properties = Object.keys(error.error)
    const t =  {} as T
    properties.forEach(x => {
     t[x] = (error.error[x] as Array<string>).join(' ')
    })
    return t
  }

  setErrorSpace(field: string) {
    if (!this.error || !this.error[field]) {
      return ''
    }

    if (this.error[field].length < 60) {
      return 'err'
    }

    return 'err-long'
  }
}
