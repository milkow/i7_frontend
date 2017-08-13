import {Component} from '@angular/core'
import {FormControl} from '@angular/forms'

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css'],
})
export class RestorePasswordComponent {
  emailFormControl: FormControl = new FormControl('')
}
