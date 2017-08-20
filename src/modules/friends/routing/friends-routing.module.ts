
import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {FriendsComponent} from '../components/friends.component'

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: FriendsComponent,
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FriendsRoutingModule {}
