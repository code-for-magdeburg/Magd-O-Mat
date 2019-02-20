import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ButtonsModule, ModalModule, PaginationModule, ProgressbarModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { UmfrageComponent } from './umfrage/umfrage.component';
import { TeaserComponent } from './teaser/teaser.component';
import { ThesenCheckComponent } from './thesen-check/thesen-check.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { ParteiDetailsComponent } from './partei-details/partei-details.component';
import { TheseDetailsComponent } from './these-details/these-details.component';
import { HilfeComponent } from './hilfe/hilfe.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { UeberUnsComponent } from './ueber-uns/ueber-uns.component';
import { LTWSA2016Component } from './ltwsa2016/ltwsa2016.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThesenComponent } from './thesen/thesen.component';


registerLocaleData(localeDe, 'de');

library.add(fas, far);


const ROUTES: Routes = [
    { path: '', component: UmfrageComponent },
    //{ path: 'teaser', component: TeaserComponent },
    { path: 'ueber-uns', component: UeberUnsComponent },
    { path: 'hilfe', component: HilfeComponent },
    { path: 'impressum', component: ImpressumComponent },
    { path: 'umfrage', component: UmfrageComponent },
    { path: 'thesen', component: ThesenComponent },
    { path: 'thesen-check', component: ThesenCheckComponent },
    { path: 'ltwsa-2016', component: LTWSA2016Component },
    { path: '**', redirectTo: '/', pathMatch: 'full' }
];


@NgModule({
    declarations: [
        AppComponent,
        UmfrageComponent,
        TeaserComponent,
        ThesenCheckComponent,
        ParteiDetailsComponent,
        TheseDetailsComponent,
        HilfeComponent,
        ImpressumComponent,
        UeberUnsComponent,
        LTWSA2016Component,
        ThesenComponent
    ],
    entryComponents: [
        ParteiDetailsComponent,
        TheseDetailsComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ButtonsModule.forRoot(),
        FontAwesomeModule,
        FormsModule,
        HttpClientModule,
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        ProgressbarModule.forRoot(),
        RouterModule.forRoot(ROUTES),
        ToastrModule.forRoot()
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'de' }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
