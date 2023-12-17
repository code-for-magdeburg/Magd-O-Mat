import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HilfeComponent } from './hilfe/hilfe.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { UeberUnsComponent } from './ueber-uns/ueber-uns.component';
import { StartComponent } from './start/start.component';
import { ThesenCheckComponent } from './thesen-check/thesen-check.component';


const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'start', component: StartComponent },
  { path: 'ueber-uns', component: UeberUnsComponent },
  { path: 'hilfe', component: HilfeComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'thesen-check', component: ThesenCheckComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
