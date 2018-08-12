import {Component, forwardRef} from '@angular/core'
import {FormControl, NG_VALIDATORS, Validators} from '@angular/forms'


const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => LogInComponent),
      multi: true
    }
  ]
})
export class LogInComponent {

  emailFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)])

  passwordFormControl: FormControl = new FormControl('')

  constructor() {
  }

}
