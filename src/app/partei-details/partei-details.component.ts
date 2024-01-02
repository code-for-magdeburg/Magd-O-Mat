import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Partei } from '../model/Partei';
import { faFrown, faMeh, faSmile } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { TheseEingabe } from '../model/These';
import { getParteiHref, getParteiLogo } from '../helpers';
import { CollapseModule } from 'ngx-bootstrap/collapse';


@Component({
  selector: 'app-partei-details',
  templateUrl: './partei-details.component.html',
  styleUrls: ['./partei-details.component.scss'],
  imports: [CommonModule, FontAwesomeModule, CollapseModule],
  standalone: true
})
export class ParteiDetailsComponent implements OnInit {


  protected readonly faSmile = faSmile;
  protected readonly faMeh = faMeh;
  protected readonly faFrown = faFrown;
  protected readonly faHeart = faHeart;

  protected readonly getParteiLogo = getParteiLogo;
  protected readonly getParteiHref = getParteiHref;

  partei!: Partei;
  wahlSlug!: string;
  theseEingaben: TheseEingabe[] = [];
  isCollapsed: boolean[] = [];


  constructor(public bsModalRef: BsModalRef) {
  }


  ngOnInit(): void {
    this.isCollapsed = this.theseEingaben.map(() => true);
  }


}
