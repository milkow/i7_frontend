import {Component} from '@angular/core'
import {RegistrationService} from '../../../../services/registration.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-registration-complete',
  templateUrl: './registration-complete.component.html'
})
export class RegistrationCompleteComponent {

  constructor(private reg: RegistrationService,
              private router: Router) {}

  activate(): void {
    this.reg.activate_post_activation()
    this.router.navigate(['/account/log-in'])
  }

}
