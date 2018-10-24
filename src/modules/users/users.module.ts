import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UsersRoutingModule } from './routing/users-routing.module'
import { UserDetailsComponent } from './components/user-details/user-details.component'
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatButtonModule
  ],
  declarations: [UserDetailsComponent]
})
export class UsersModule { }
