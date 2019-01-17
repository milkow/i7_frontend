import {NgModule} from '@angular/core'
import {PageNotFoundComponent} from './components/page-not-found/page-not-found'
import {AppComponent} from './components/app/app.component'
import {AccountModule} from '../account/account.module'
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {RouterModule} from '@angular/router'
import {AppRoutingModule} from './routing/app-routing.module'
import {I7EventService} from '../../services/i7event.service'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {TokenInterceptor } from '../../services/token.interceptor'
import {AuthGuardService} from '../../services/auth-guard.service'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../../environments/environment'
import { SettingsModule } from '../settings/settings.module';
import { ChangePasswordComponent } from '../settings/components/change-password/change-password.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    AccountModule,
    HttpClientModule,
    SettingsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  providers: [
    I7EventService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ChangePasswordComponent]
})
export class AppModule {

}
