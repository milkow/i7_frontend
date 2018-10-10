import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MatButtonModule, MatIconModule, MatMenuModule, MatListModule,
   MatInputModule, MatFormFieldModule, MatAutocompleteModule, MatOptionModule} from '@angular/material'
import {ModuleHeaderComponent} from './components/module-header/module-header.component'
import {PageHeaderComponent} from './components/page-header/page-header.component'
import {ArrowBackComponent} from './components/arrow-back/arrow-back.component'
import { MapBoxComponent } from './components/map-box/map-box.component'
import { MessagesComponent } from './components/messages/messages.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {TimeAgoPipe} from 'time-ago-pipe'
import { LocationComponent } from './components/location/location.component'
import { NotificationComponent } from './components/notification/notification.component'
import { FriendsBarComponent } from './components/friends-bar/friends-bar.component'

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  declarations: [
    ModuleHeaderComponent,
    PageHeaderComponent,
    ArrowBackComponent,
    MapBoxComponent,
    MessagesComponent,
    TimeAgoPipe,
    LocationComponent,
    NotificationComponent,
    FriendsBarComponent,
  ],
  exports: [
    ModuleHeaderComponent,
    PageHeaderComponent,
    ArrowBackComponent,
    MapBoxComponent,
    MessagesComponent,
    NotificationComponent,
    FriendsBarComponent,
  ]
})
export class UtilsModule {}
