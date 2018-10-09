import { Component, OnInit } from '@angular/core'
import { RegistrationService } from '../../../../services/registration.service'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-registration-complete',
  templateUrl: './registration-complete.component.html'
})
export class RegistrationCompleteComponent implements OnInit {
  constructor(
    private registrationService: RegistrationService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

  }

  activate(): void {
    this.route.params.subscribe(params => {
      if (!params['id']) {
        return
      }
      this.registrationService.activate(params['id']).subscribe(() => {
        this.registrationService.activate_post_activation()
        this.router.navigate(['/account/log-in'])
      })
    })
  }
}
