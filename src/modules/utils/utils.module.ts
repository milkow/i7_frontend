import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MatButtonModule, MatIconModule, MatMenuModule} from '@angular/material'
import {ModuleHeaderComponent} from './components/module-header/module-header.component'
import {PageHeaderComponent} from './components/page-header/page-header.component'
import {ArrowBackComponent} from './components/arrow-back/arrow-back.component'
import { MapBoxComponent } from './components/map-box/map-box.component'

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  declarations: [
    ModuleHeaderComponent,
    PageHeaderComponent,
    ArrowBackComponent,
    MapBoxComponent,
  ],
  exports: [
    ModuleHeaderComponent,
    PageHeaderComponent,
    ArrowBackComponent,
    MapBoxComponent
  ]
})
export class UtilsModule {}
