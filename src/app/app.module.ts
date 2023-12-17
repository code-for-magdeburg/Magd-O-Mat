import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { HilfeComponent } from './hilfe/hilfe.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { UeberUnsComponent } from './ueber-uns/ueber-uns.component';
import { StartComponent } from './start/start.component';
import { ThesenCheckComponent } from './thesen-check/thesen-check.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';


registerLocaleData(localeDe, 'de');


@NgModule({
  declarations: [
    AppComponent,
    HilfeComponent,
    ImpressumComponent,
    UeberUnsComponent,
    StartComponent,
    ThesenCheckComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonsModule.forRoot(),
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    ProgressbarModule.forRoot(),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
