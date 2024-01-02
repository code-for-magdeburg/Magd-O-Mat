import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { faFrown, faMeh, faSmile } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Partei } from '../model/Partei';
import { These, TheseEingabe } from '../model/These';
import { CommonModule } from '@angular/common';
import { getParteiLogo } from '../helpers';
import { CollapseModule } from 'ngx-bootstrap/collapse';


@Component({
  selector: 'app-these-details',
  templateUrl: './these-details.component.html',
  styleUrls: ['./these-details.component.scss'],
  imports: [CommonModule, FontAwesomeModule, CollapseModule],
  standalone: true
})
export class TheseDetailsComponent implements OnInit {


  protected readonly faSmile = faSmile;
  protected readonly faMeh = faMeh;
  protected readonly faFrown = faFrown;
  protected readonly faHeart = faHeart;

  protected readonly getParteiLogo = getParteiLogo;

  these!: These;
  theseIndex!: number;
  theseEingabe!: TheseEingabe
  parteien!: Partei[];
  wahlSlug!: string;
  isCollapsed: boolean[] = [];


  constructor(public bsModalRef: BsModalRef) {
  }


  ngOnInit() {
    this.isCollapsed = this.parteien.map(() => true);
  }


}
