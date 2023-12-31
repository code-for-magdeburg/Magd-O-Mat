import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { faFrown, faMeh, faSmile } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Partei } from '../model/Partei';
import { These, TheseEingabe } from '../model/These';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-these-details',
  templateUrl: './these-details.component.html',
  styleUrls: ['./these-details.component.scss'],
  imports: [CommonModule, FontAwesomeModule],
  standalone: true
})
export class TheseDetailsComponent {


  protected readonly faSmile = faSmile;
  protected readonly faMeh = faMeh;
  protected readonly faFrown = faFrown;
  protected readonly faHeart = faHeart;

  these?: These;
  theseEingabe?: TheseEingabe
  anzahlThesen = 0;
  parteien: Partei[] = [];
  wahl = environment.wahl;


  constructor(public bsModalRef: BsModalRef) {
  }


}
