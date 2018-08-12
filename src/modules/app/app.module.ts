import {NgModule} from '@angular/core'
import {PageNotFoundComponent} from './components/page-not-found/page-not-found'
import {AppComponent} from './components/app/app.component'

import 'hammerjs'
import {AccountModule} from '../account/account.module'
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {RouterModule} from '@angular/router'
import {AppRoutingModule} from './routing/app-routing.module'
import {ApiService} from '../../services/api/api.service'
import {HttpClientModule} from '@angular/common/http'

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    AccountModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {

}
