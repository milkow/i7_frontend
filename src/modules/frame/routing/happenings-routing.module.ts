import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {FrameComponent} from '../components/frame/frame.component'
import { AuthGuardService } from '../../../services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: FrameComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadChildren: './../../dashboard/dashboard.module#DashboardModule',
      },
      {
        path: 'explore',
        loadChildren: './../../explore/explore.module#ExploreModule',
      },
      {
        path: 'groups',
        loadChildren: './../../groups/groups.module#GroupsModule',
      },
      {
        path: 'friends',
        loadChildren: './../../friends/friends.module#FriendsModule',
      },
      {
        path: 'notifications',
        loadChildren: './../../notifications/notifications.module#NotificationsModule',
      },
      {
        path: 'settings',
        loadChildren: './../../settings/settings.module#SettingsModule',
      },
      {
        path: 'events',
        loadChildren: './../../events/events.module#EventsModule',
      }
    ]
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FrameRoutingModule {

}
