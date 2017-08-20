
import {NgModule} from '@angular/core'
import {SettingsComponent} from './components/settings/settings.component'
import {SettingsRoutingModule} from './routing/settings-routing.module'
import {MdButtonModule} from '@angular/material'

@NgModule({
  imports: [
    SettingsRoutingModule,
    MdButtonModule,
  ],
  declarations: [
    SettingsComponent,
  ],
  bootstrap: [SettingsComponent]
})
export class SettingsModule {}
