import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from './shared-module/shared.module';
import { CoreModule } from './core-module/core.module';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HomeComponent } from './home.component';
import { MainMenuComponent } from './navigation/mainMenu.component';
import { LoginComponent } from './users/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EventService } from './core-module/event.service';
import { SettingsComponent } from './users/settings.component';
import { LoggedInGuard } from './shared-module/logged-in.guard';
import { AuthenitcationInterceptor } from './shared-module/authentication-interceptor';
import { MockBackend } from './mocks/mock_backend';
import { EventComponent } from './event.component';
import { AddJobComponent } from './add-job.component';
import { TimepickerModule, BsDropdownModule, BsDatepickerModule } from 'ngx-bootstrap';
import { EditEventComponent } from './edit-event.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MessageComponent } from './message/message.component';
import { DonationComponent } from './donations.component';
import { TimePassedPipe } from './message/time-ago.pipe';
import { MessageService } from './message/message.service';
import { DeactivateGuardService } from './deactivate-guard.service';
import { IsTypingPipe } from './message/isTyping.pipe';
import { GuardModalComponent } from './guardmodal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AboutComponent } from './about.component';
import {FaqComponent} from './faq.component';
if (environment.production) {
  enableProdMode();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainMenuComponent,
    LoginComponent,
    SettingsComponent,
    EventComponent,
    EditEventComponent,
    AddJobComponent,
    MessageComponent,
    DonationComponent,
    AboutComponent,
    FaqComponent,
    TimePassedPipe,
    GuardModalComponent,
    IsTypingPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'settings', component: SettingsComponent, canActivate: [LoggedInGuard], canDeactivate: [DeactivateGuardService] },
      { path: 'event/edit/:ID', component: EditEventComponent , canDeactivate: [DeactivateGuardService]},
      { path: 'event/:ID', component: EventComponent, canDeactivate: [] },
      { path: 'messages', component: MessageComponent, canActivate: [LoggedInGuard] },
      { path: 'donations', component: DonationComponent },
      { path: 'about', component: AboutComponent },
      { path: 'faq', component: FaqComponent },
      { path: '**', redirectTo: '', pathMatch: 'full'}
    ]),
    BrowserAnimationsModule,
    TimepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      closeButton: true,
      positionClass: 'toast-bottom-right'
    }),
    TooltipModule.forRoot(),
    CoreModule,
  ],
  providers: [
    LoggedInGuard,
    DeactivateGuardService,
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthenitcationInterceptor, multi: true },
    ...environment.providers
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, AddJobComponent, GuardModalComponent]
})
export class AppModule { }
