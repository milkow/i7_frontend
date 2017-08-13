import {Injectable} from '@angular/core'

@Injectable()
export class RegistrationService {
  public post_activation: Boolean = false

  activate_post_activation(): void {
    this.post_activation = true
  }

  deactivate_post_activation(): void {
    this.post_activation = false
  }

}
