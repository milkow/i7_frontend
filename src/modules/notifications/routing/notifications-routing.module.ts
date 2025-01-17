import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {NotificationsComponent} from '../components/notifications.component'


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: NotificationsComponent,
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class NotificationsRoutingModule {}
