import {NgModule} from '@angular/core'
import {SettingsComponent} from './components/settings/settings.component'
import {SettingsRoutingModule} from './routing/settings-routing.module'
import {MdButtonModule, MdListModule} from '@angular/material'

@NgModule({
  imports: [
    SettingsRoutingModule,
    MdButtonModule,
    MdListModule,
  ],
  declarations: [
    SettingsComponent,
  ],
  bootstrap: [SettingsComponent]
})
export class SettingsModule {
}
