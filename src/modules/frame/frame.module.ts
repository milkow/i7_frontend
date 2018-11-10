import {FrameComponent} from './components/frame/frame.component'
import {FrameRoutingModule} from './routing/frame-routing.module'
import {MatButtonModule, MatIconModule, MatInputModule} from '@angular/material'
import {NavigationComponent} from './components/navigation/navigation.component'
import {NavigationMobileComponent} from './components/navigation-mobile/navigation-mobile.component'
import {NavigationPcComponent} from './components/navigation-pc/navigation-pc.component'
import {NavigationListItemComponent} from './components/navigation-list/navigation-list-item.component'
import {NavigationListComponent} from './components/navigation-list/navigation-list.component'
import {NavigationListSearchComponent} from './components/navigation-list/navigation-list-search.component'
import {UtilsModule} from '../utils/utils.module'
import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {SearchbarMobileComponent} from './components/searchbar-mobile/searchbar-mobile.component'
import {NotificationsPopupComponent} from './components/notifications-popup/notifications-popup.component'
import {MatBadgeModule} from '@angular/material/badge'


@NgModule({
  imports: [
    FrameRoutingModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    UtilsModule,
    CommonModule,
    MatBadgeModule,
  ],
  declarations: [
    FrameComponent,
    NavigationComponent,
    NavigationMobileComponent,
    NavigationPcComponent,
    NavigationListComponent,
    NavigationListItemComponent,
    NavigationListSearchComponent,
    SearchbarMobileComponent,
    NotificationsPopupComponent,
  ],
  providers: [],
  bootstrap: [FrameComponent],
  entryComponents: [],
})
export class FrameModule {

}
