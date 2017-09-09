import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MdButtonModule, MdIconModule, MdMenuModule} from '@angular/material'
import {ModuleHeaderComponent} from './components/module-header/module-header.component'
import {PageHeaderComponent} from './components/page-header/page-header.component'

@NgModule({
  imports: [
    CommonModule,
    MdIconModule,
    MdMenuModule,
    MdButtonModule,
  ],
  declarations: [
    ModuleHeaderComponent,
    PageHeaderComponent,
  ],
  exports: [
    ModuleHeaderComponent,
    PageHeaderComponent,
  ]
})
export class UtilsModule {}
