import {Component} from '@angular/core'
import {Form, FormControl} from '@angular/forms'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  usernameFormControl: FormControl = new FormControl('')
  emailFormControl: FormControl = new FormControl('')
  password1FormControl: FormControl = new FormControl('')
  password2FormControl: FormControl = new FormControl('')
}
