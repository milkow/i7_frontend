import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { User } from '../../../../shared/models/user'
import { PasswordValidation } from '../../../utils/validators/password'
import { UserService } from '../../../../services/user.service'
import { ChangePassword } from '../../../../shared/models/change-password'
import { MatDialogRef } from '@angular/material';
import { UtilsService } from '../../../../services/utils.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  loading: boolean
  restoreId: string
  user: User
  error: any
  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private utilsService: UtilsService) { }

  ngOnInit() {
    this.form = this.fb.group({
      old_password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      new_password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    },
      { validator: PasswordValidation.MatchChangePassword })
  }

  onSubmit() {
    if (!this.form.valid) {
      return
    }
    this.loading = true

    const changePassword = new ChangePassword({
      old_password: this.form.controls.old_password.value,
      new_password: this.form.controls.new_password.value
    })


    this.userService
      .changePassword(changePassword)
      .subscribe(
        () => this.dialogRef.close(),
        (err: HttpErrorResponse) => {
          this.error = this.utilsService.setErrors(err, this.form)
          this.loading = false
        })
  }
}
