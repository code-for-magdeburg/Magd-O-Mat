import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
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
  wahl = environment.wahl;
  theseEingaben: TheseEingabe[] = [];


  constructor(public bsModalRef: BsModalRef) {
  }


}
