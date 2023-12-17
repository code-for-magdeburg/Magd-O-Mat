import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { Partei } from '../model/Partei';
import { faFrown, faMeh, faSmile } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from "@angular/common";


@Component({
  selector: 'app-partei-details',
  templateUrl: './partei-details.component.html',
  styleUrls: ['./partei-details.component.scss'],
  imports: [CommonModule, FontAwesomeModule],
  standalone: true
})
export class ParteiDetailsComponent implements OnInit {

  faSmile = faSmile;
  faMeh = faMeh;
  faFrown = faFrown;
  faHeart = faHeart;

  partei?: Partei;
  wahl = environment.wahl;
  thesen: any[] = [];


  constructor(public bsModalRef: BsModalRef) {
  }


  ngOnInit(): void {

    const partei = this.partei;
    if (partei) {
      this.thesen.forEach(these => these.wertungPartei = partei.thesen[these.id]);
    }

  }


}
