import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { PasswordValidation } from '../../../utils/validators/password'
import { User } from '../../../../shared/models/user'
import { ActivatedRoute, Router } from '@angular/router'
import { RestorePassword } from '../../../../shared/models/restore-password'
import { HttpErrorResponse } from '@angular/common/http'
import { UtilsService } from '../../../../services/utils.service'
import { PasswordRestorationService } from '../../../../services/password-restoration.service'

@Component({
  selector: 'app-restore-password-set',
  templateUrl: './restore-password-set.component.html',
  styleUrls: ['./restore-password-set.component.css']
})
export class RestorePasswordSetComponent implements OnInit {
  loading: boolean
  restoreId: string
  user: User
  error: any
  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private passwordRestorationService: PasswordRestorationService,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.form = this.fb.group({
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
      logout_other_sessions: new FormControl(true)
    },
      { validator: PasswordValidation.MatchPassword })

    this.route.params.subscribe(params => {
      if (!params['id']) {
        return
      }
      this.restoreId = params['id']

      this.passwordRestorationService
        .restoreRead(this.restoreId)
        .subscribe(user => this.user = user)
    })
  }

  onSubmit() {
    if (!this.form.valid) {
      return
    }

    const restorePassword = new RestorePassword({
      password: this.form.controls.password.value,
      logout_other_sessions: this.form.controls.logout_other_sessions.value
    })

    this.loading = true
    this.passwordRestorationService
      .restore(this.restoreId, restorePassword)
      .subscribe(() => {
        this.router.navigate([`account/restore-password-success`])
      }, (err: HttpErrorResponse) => {
        this.error = this.utilsService.setErrors(err, this.form)
        this.loading = false
      })
  }
}
