import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Partei } from '../model/Partei';
import { faFrown, faMeh, faSmile } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { TheseEingabe } from '../model/These';


@Component({
  selector: 'app-partei-details',
  templateUrl: './partei-details.component.html',
  styleUrls: ['./partei-details.component.scss'],
  imports: [CommonModule, FontAwesomeModule],
  standalone: true
})
export class ParteiDetailsComponent {


  protected readonly faSmile = faSmile;
  protected readonly faMeh = faMeh;
  protected readonly faFrown = faFrown;
  protected readonly faHeart = faHeart;

  partei!: Partei;
  wahlSlug!: string;
  theseEingaben: TheseEingabe[] = [];


  constructor(public bsModalRef: BsModalRef) {
  }


  getParteiLogoUrl(): string {
    return `assets/${this.wahlSlug}/img/${this.partei.logo}`;
  }


  getParteiHref(): string {
    return this.partei.internetadresse.startsWith('http://') || this.partei.internetadresse.startsWith('https://')
      ? this.partei.internetadresse
      : `http://${this.partei.internetadresse}`;
  }


}
