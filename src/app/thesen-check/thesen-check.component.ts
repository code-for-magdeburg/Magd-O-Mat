import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ParteiDetailsComponent } from '../partei-details/partei-details.component';
import { TheseDetailsComponent } from '../these-details/these-details.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { These } from '../model/These';
import { Partei } from '../model/Partei';
import { faArrowLeft, faRedo, faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faFrown, faHeart as farHeart, faMeh, faSmile, faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { firstValueFrom } from 'rxjs';


type ErgebnisThese = {
  these: These;
  maxPunkte: number;
};

type ErgebnisPartei = {
  partei: Partei;
  prozent: number;
};


@Component({
  selector: 'app-thesen-check',
  templateUrl: './thesen-check.component.html',
  styleUrls: ['./thesen-check.component.scss']
})
export class ThesenCheckComponent implements OnInit {


  faArrowLeft = faArrowLeft
  fasHeart = fasHeart;
  farHeart = farHeart;
  faSmile = faSmile;
  faMeh = faMeh;
  faFrown = faFrown;
  faRedo = faRedo;
  faFilePdf = faFilePdf;

  modus = 'Eingabe';

  thesen: These[] = [];
  parteien: Partei[] = [];
  ergebnisseThesen: ErgebnisThese[] = [];
  ergebnisseParteien: ErgebnisPartei[] = [];

  aktuelleTheseIndex = -1;
  aktuelleThese?: These;

  wahl = environment.wahl;

  modalRef?: BsModalRef;


  constructor(private modalService: BsModalService, private http: HttpClient) {
  }


  async ngOnInit() {
    await this.neustart();
  }


  waehleThese(index: number) {
    this.aktuelleTheseIndex = index;
    this.aktuelleThese = this.thesen[this.aktuelleTheseIndex];
  }


  stimmeJa() {
    if (this.aktuelleThese) {
      this.aktuelleThese.wertung = 'ja';
      this.aktuelleThese.gewertet = true;
      this.naechsteTheseOderAuswertung();
    }
  }


  stimmeEgal() {
    if (this.aktuelleThese) {
      this.aktuelleThese.wertung = 'neutral';
      this.aktuelleThese.gewertet = true;
      this.naechsteTheseOderAuswertung();
    }
  }


  stimmeNein() {
    if (this.aktuelleThese) {
      this.aktuelleThese.wertung = 'nein';
      this.aktuelleThese.gewertet = true;
      this.naechsteTheseOderAuswertung();
    }
  }


  ueberspringen() {
    if (this.aktuelleThese) {
      this.aktuelleThese.wertung = 'ohne';
      this.aktuelleThese.gewertet = false;
      this.naechsteTheseOderAuswertung();
    }
  }


  zurueck() {

    if (this.aktuelleTheseIndex > 0) {
      this.waehleThese(this.aktuelleTheseIndex - 1);
    }

  }


  async neustart() {
    this.modus = 'Eingabe';
    await Promise.all([this.ladeThesen(), this.ladeParteien()])
    this.waehleThese(0);
  }


  zeigePartei(partei: any) {
    this.modalRef = this.modalService.show(
      ParteiDetailsComponent,
      { initialState: { partei, thesen: this.thesen } }
    );
  }


  zeigeThese(these: any) {
    this.modalRef = this.modalService.show(TheseDetailsComponent, {
      initialState: {
        these,
        anzahlThesen: this.thesen.length,
        parteien: this.parteien
      }
    });
  }


  private async ladeThesen() {

    const thesen = await firstValueFrom(this.http.get<These[]>(`assets/${this.wahl}/thesen.json`));
    this.thesen = thesen.map(these => ({
      id: these.id,
      kategorie: these.kategorie,
      text: these.text,
      doppeltGewertet: false,
      gewertet: false,
      wertung: 'ohne'
    }));

  }


  private async ladeParteien() {
    this.parteien = await firstValueFrom(this.http.get<Partei[]>(`assets/${this.wahl}/parteien.json`));
  }


  private naechsteTheseOderAuswertung() {

    if (this.aktuelleTheseIndex + 1 >= this.thesen.length) {

      this.modus = 'Auswertung';

      this.ergebnisseThesen = [];
      for (const these of this.thesen) {
        this.ergebnisseThesen.push({
          these,
          maxPunkte: this.bestimmeMaxPunkte(these)
        });
      }

      const maxPunkte = this.ergebnisseThesen.reduce(
        (summe, ergebnis) => summe + ergebnis.maxPunkte,
        0
      );

      this.ergebnisseParteien = [];
      for (const partei of this.parteien) {

        this.ergebnisseParteien.push({
          partei,
          prozent: this.berechneProzent(partei, maxPunkte)
        });

      }

      this.ergebnisseParteien.sort((a, b) => b.prozent - a.prozent);

    } else {
      this.waehleThese(this.aktuelleTheseIndex + 1);
    }

  }


  private bestimmeMaxPunkte(these: These): number {

    const punkteProPartei = this.parteien.map(partei => {

      const wertungPartei = partei.thesen[these.id];

      let punkte = 0;
      switch (these.wertung) {

        case 'ja':
          if (wertungPartei === 'ja') {
            punkte = 2;
          } else if (wertungPartei === 'neutral') {
            punkte = 1;
          }
          break;

        case 'neutral':
          if (wertungPartei === 'neutral') {
            punkte = 2;
          } else if (wertungPartei === 'ja' || wertungPartei === 'nein') {
            punkte = 1;
          }
          break;

        case 'nein':
          if (wertungPartei === 'nein') {
            punkte = 2;
          } else if (wertungPartei === 'neutral') {
            punkte = 1;
          }
          break;

      }

      return these.doppeltGewertet ? 2 * punkte : punkte;

    });

    return Math.max(...punkteProPartei);

  }


  private berechneProzent(partei: Partei, maxPunkte: number): number {

    if (maxPunkte === 0) {
      return 0;
    }

    let summe = 0;

    for (const these of this.thesen) {

      let punkte = 0;

      switch (partei.thesen[these.id]) {

        case 'ja':
          if (these.wertung === 'ja') {
            punkte = 2;
          } else if (these.wertung === 'neutral') {
            punkte = 1;
          }
          break;

        case 'neutral':
          if (these.wertung === 'neutral') {
            punkte = 2;
          } else if (these.wertung === 'ja' || these.wertung === 'nein') {
            punkte = 1;
          }
          break;

        case 'nein':
          if (these.wertung === 'nein') {
            punkte = 2;
          } else if (these.wertung === 'neutral') {
            punkte = 1;
          }
          break;

      }

      summe += these.doppeltGewertet ? 2 * punkte : punkte;

    }

    return summe / maxPunkte;

  }


}
