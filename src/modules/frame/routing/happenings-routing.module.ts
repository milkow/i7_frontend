import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {FrameComponent} from '../components/frame/frame.component'

const routes: Routes = [
  {
    path: '',
    component: FrameComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'explore'
      },
      {
        path: 'explore',
        loadChildren: './../../explore/explore.module#ExploreModule'
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
