import {Component, forwardRef, OnInit} from '@angular/core'
import {FormControl, NG_VALIDATORS, Validators} from '@angular/forms'
import {ActivatedRoute} from '@angular/router'
import {RegistrationService} from '../../../../services/registration.service'
import {MdDialog} from '@angular/material'
import {ActivationDialogComponent} from '../helpers/activation-dialog/activation-dialog.component'


const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => LogInComponent),
      multi: true
    }
  ]
})
export class LogInComponent implements OnInit {

  emailFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)])

  passwordFormControl: FormControl = new FormControl('')

  constructor(private reg: RegistrationService,
              private router: ActivatedRoute,
              public dialog: MdDialog) {
  }

  ngOnInit(): void {
    if (this.reg.post_activation) {
      this.dialog.open(ActivationDialogComponent)
      this.reg.deactivate_post_activation()
    }
  }


}
