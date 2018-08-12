import {Component, OnInit} from '@angular/core'
import {AuthorizationService} from '../../../../services/authorization.service'

@Component({
  selector: 'app-oauth2-log-in',
  templateUrl: './o-auth2-log-in.component.html',
  styleUrls: ['./o-auth2-log-in.component.css']
})
export class OAuth2LogInComponent implements OnInit {

  constructor(private authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.authorizationService.authorize()
  }

}
