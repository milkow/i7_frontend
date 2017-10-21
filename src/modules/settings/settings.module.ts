import {NgModule} from '@angular/core'
import {SettingsComponent} from './components/settings/settings.component'
import {SettingsRoutingModule} from './routing/settings-routing.module'
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatTableModule
} from '@angular/material'
import {CommonModule} from '@angular/common'
import {UtilsModule} from '../utils/utils.module'

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    UtilsModule,
  ],
  declarations: [
    SettingsComponent,
  ],
  bootstrap: [SettingsComponent]
})
export class SettingsModule {
}
