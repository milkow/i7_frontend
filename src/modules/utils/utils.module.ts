import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MdButtonModule, MdIconModule, MdMenuModule} from '@angular/material'
import {ModuleHeaderComponent} from './components/module-header/module-header.component'

@NgModule({
  imports: [
    CommonModule,
    MdIconModule,
    MdMenuModule,
    MdButtonModule,
  ],
  declarations: [
    ModuleHeaderComponent,
  ],
  exports: [
    ModuleHeaderComponent,
  ]
})
export class UtilsModule {}
