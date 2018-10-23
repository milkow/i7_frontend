import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { UserService } from '../../../../services/user.service'
import { User } from '../../../../shared/models/user'
import { Happening } from '../../../../shared/models/happening';
import { HappeningService } from '../../../../services/happening.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User
  sharedHappenings: Happening[]

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private happeningService: HappeningService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (!params['id']) {
        return
      }
      this.userService.
      getUser(params['id']).
      subscribe(user => this.user = user)
    })
    this.happeningService.getHappenings().subscribe(data => this.sharedHappenings = data.slice(0, 4))
  }

}
