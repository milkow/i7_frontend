import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UsersRoutingModule } from './routing/users-routing.module'
import { UserDetailsComponent } from './components/user-details/user-details.component'
import { MatButtonModule } from '@angular/material';
import { UserSharedAlbumComponent } from './components/user-shared-album/user-shared-album.component'
import {UtilsModule} from '../utils/utils.module'

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatButtonModule,
    UtilsModule,
  ],
  declarations: [UserDetailsComponent, UserSharedAlbumComponent]
})
export class UsersModule { }
