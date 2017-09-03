import {NgModule} from '@angular/core'
import {SettingsComponent} from './components/settings/settings.component'
import {SettingsRoutingModule} from './routing/settings-routing.module'
import {
  MdButtonModule,
  MdIconModule,
  MdListModule,
  MdMenuModule,
  MdProgressSpinnerModule,
  MdTableModule
} from '@angular/material'
import {CommonModule} from '@angular/common'
import {UtilsModule} from '../utils/utils.module'

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MdButtonModule,
    MdListModule,
    MdTableModule,
    MdMenuModule,
    MdIconModule,
    MdProgressSpinnerModule,
    UtilsModule,
  ],
  declarations: [
    SettingsComponent,
  ],
  bootstrap: [SettingsComponent]
})
export class SettingsModule {
}
