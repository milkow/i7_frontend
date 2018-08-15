import { Component, OnInit } from '@angular/core'
import {AuthorizationService} from '../../../../services/authorization.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-authorize-step1',
  templateUrl: './o-auth2-authorize.component.html',
  styleUrls: ['./o-auth2-authorize.component.css']
})
export class OAuth2AuthorizeComponent implements OnInit {

  constructor(
    private loginService: AuthorizationService,
    private router: Router,

    ) { }

  ngOnInit() {
    this.loginService.tokenExchange(() => {
      this.router.navigate(['/dashboard'])
    })
    // this.router.navigate()
  }

}
