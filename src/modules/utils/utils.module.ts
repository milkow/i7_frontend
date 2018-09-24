import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MatButtonModule, MatIconModule, MatMenuModule, MatListModule, MatInputModule} from '@angular/material'
import {ModuleHeaderComponent} from './components/module-header/module-header.component'
import {PageHeaderComponent} from './components/page-header/page-header.component'
import {ArrowBackComponent} from './components/arrow-back/arrow-back.component'
import { MapBoxComponent } from './components/map-box/map-box.component'
import { MessagesComponent } from './components/messages/messages.component'
import { FormsModule } from '@angular/forms'
import {TimeAgoPipe} from 'time-ago-pipe'

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    FormsModule
  ],
  declarations: [
    ModuleHeaderComponent,
    PageHeaderComponent,
    ArrowBackComponent,
    MapBoxComponent,
    MessagesComponent,
    TimeAgoPipe
  ],
  exports: [
    ModuleHeaderComponent,
    PageHeaderComponent,
    ArrowBackComponent,
    MapBoxComponent,
    MessagesComponent
  ]
})
export class UtilsModule {}
