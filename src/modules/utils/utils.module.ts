import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MatButtonModule, MatIconModule, MatMenuModule} from '@angular/material'
import {ModuleHeaderComponent} from './components/module-header/module-header.component'
import {PageHeaderComponent} from './components/page-header/page-header.component'

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
  ],
  exports: [
    ModuleHeaderComponent,
    PageHeaderComponent,
  ]
})
export class UtilsModule {}
