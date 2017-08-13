import {NgModule} from '@angular/core'
import {PageNotFoundComponent} from './components/page-not-found/page-not-found'
import {RoutingModule} from '../routing/routing.module'
import {BrowserModule} from '@angular/platform-browser'
import {AccountModule} from '../account/account.module'
import {CommonModule} from '@angular/common'
import {AppComponent} from './components/app/app.component'

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RoutingModule,
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {

}
