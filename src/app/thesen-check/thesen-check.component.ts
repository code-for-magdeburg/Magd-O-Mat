import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ParteiDetailsComponent } from '../partei-details/partei-details.component';
import { TheseDetailsComponent } from '../these-details/these-details.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { These, TheseEingabe, TheseWertung } from '../model/These';
import { Partei } from '../model/Partei';
import { faHeart as fasHeart, faRedo } from '@fortawesome/free-solid-svg-icons';
import { faFilePdf, faFrown, faMeh, faSmile } from '@fortawesome/free-regular-svg-icons';
import { firstValueFrom, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { getParteiLogo, getPositionenDokument } from '../helpers';


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


  protected readonly fasHeart = fasHeart;
  protected readonly faSmile = faSmile;
  protected readonly faMeh = faMeh;
  protected readonly faFrown = faFrown;
  protected readonly faRedo = faRedo;
  protected readonly faFilePdf = faFilePdf;

  protected readonly getParteiLogo = getParteiLogo;
  protected readonly getPositionenDokument = getPositionenDokument;

  modus = 'Eingabe';

  thesen: These[] = [];
  parteien: Partei[] = [];

  thesenEingaben: TheseEingabe[] = [];
  ergebnisseParteien: ErgebnisPartei[] = [];

  aktuelleTheseIndex = -1;

  wahlSlug = environment.defaultWahl;

  modalRef?: BsModalRef;


  constructor(
    private readonly modalService: BsModalService,
    private readonly http: HttpClient,
    private readonly route: ActivatedRoute) {
  }


  ngOnInit() {

    this.route.params
      .pipe(map(params => params['wahlSlug']))
      .subscribe(async wahlSlug => {
        this.wahlSlug = wahlSlug;
        await Promise.all([this.ladeThesen(wahlSlug), this.ladeParteien(wahlSlug)])
        this.neustart();
      });

  }


  waehleThese(index: number) {
    this.aktuelleTheseIndex = index;
  }


  handleWertung(wertung: TheseWertung) {

    switch (wertung) {
      case 'ja':
        if (this.aktuelleTheseIndex > -1) {
          this.thesenEingaben[this.aktuelleTheseIndex].wertung = 'ja';
          this.naechsteTheseOderAuswertung();
        }
        break;
      case 'neutral':
        if (this.aktuelleTheseIndex > -1) {
          this.thesenEingaben[this.aktuelleTheseIndex].wertung = 'neutral';
          this.naechsteTheseOderAuswertung();
        }
        break;
      case 'nein':
        if (this.aktuelleTheseIndex > -1) {
          this.thesenEingaben[this.aktuelleTheseIndex].wertung = 'nein';
          this.naechsteTheseOderAuswertung();
        }
        break;
    }

  }


  ueberspringen() {
    if (this.aktuelleTheseIndex > -1) {
      this.thesenEingaben[this.aktuelleTheseIndex].wertung = 'ohne';
      this.naechsteTheseOderAuswertung();
    }
  }


  zurueck() {
    if (this.aktuelleTheseIndex > 0) {
      this.waehleThese(this.aktuelleTheseIndex - 1);
    }
  }


  neustart() {
    this.resetEingaben();
    this.modus = 'Eingabe';
    this.waehleThese(0);
  }


  zeigePartei(partei: Partei) {
    this.modalRef = this.modalService.show(
      ParteiDetailsComponent,
      { initialState: { partei, theseEingaben: this.thesenEingaben, wahlSlug: this.wahlSlug } }
    );
  }


  zeigeThese(theseIndex: number) {
    this.modalRef = this.modalService.show(TheseDetailsComponent, {
      initialState: {
        these: this.thesen[theseIndex],
        theseIndex,
        theseEingabe: this.thesenEingaben[theseIndex],
        wahlSlug: this.wahlSlug,
        parteien: this.parteien
      }
    });
  }


  private async ladeThesen(wahlSlug: string) {
    this.thesen = await firstValueFrom(this.http.get<These[]>(`/assets/thesen-checks/${wahlSlug}/thesen.json`));
  }


  private async ladeParteien(wahlSlug: string) {
    this.parteien = await firstValueFrom(this.http.get<Partei[]>(`/assets/thesen-checks/${wahlSlug}/parteien.json`));
  }


  private resetEingaben() {
    this.thesenEingaben = this.thesen.map(these => ({
      these,
      wertung: 'ohne',
      doppeltGewertet: false
    }));
  }


  private naechsteTheseOderAuswertung() {

    if (this.aktuelleTheseIndex + 1 >= this.thesen.length) {

      this.modus = 'Auswertung';

      const ergebnisseThesen = this.thesenEingaben.map((eingabe, index) => ({
        these: this.thesen[index],
        maxPunkte: this.bestimmeMaxPunkte(eingabe, index)
      }));

      const maxPunkte = ergebnisseThesen.reduce(
        (summe, ergebnis) => summe + ergebnis.maxPunkte,
        0
      );

      this.ergebnisseParteien = this.parteien.map(partei => ({
        partei,
        prozent: this.berechneProzent(partei, maxPunkte)
      }));
      this.ergebnisseParteien.sort((a, b) => b.prozent - a.prozent);

    } else {
      this.waehleThese(this.aktuelleTheseIndex + 1);
    }

  }


  private bestimmeMaxPunkte(theseEingabe: TheseEingabe, theseIndex: number): number {

    const punkteProPartei = this.parteien.map(partei => {
      const punkte = this.berechnePunkteProWertung(theseEingabe.wertung, partei.thesen[theseIndex].wertung);
      return theseEingabe.doppeltGewertet ? 2 * punkte : punkte;
    });

    return Math.max(...punkteProPartei);

  }


  private berechneProzent(partei: Partei, maxPunkte: number): number {

    if (maxPunkte === 0) {
      return 0;
    }

    let summe = 0;

    this.thesenEingaben.forEach((theseEingabe, index) => {
      const punkte = this.berechnePunkteProWertung(theseEingabe.wertung, partei.thesen[index].wertung);
      summe += theseEingabe.doppeltGewertet ? 2 * punkte : punkte;
    });

    return summe / maxPunkte;

  }


  private berechnePunkteProWertung(wertungEingabe: TheseWertung, wertungPartei: TheseWertung): number {
    let punkte = 0;
    switch (wertungEingabe) {
      case 'ja':
        punkte = wertungPartei === 'ja' ? 2 : (wertungPartei === 'neutral' ? 1 : 0);
        break;
      case 'neutral':
        punkte = wertungPartei === 'neutral' ? 2 : (wertungPartei === 'ja' || wertungPartei === 'nein' ? 1 : 0);
        break;
      case 'nein':
        punkte = wertungPartei === 'nein' ? 2 : (wertungPartei === 'neutral' ? 1 : 0);
        break;
    }
    return punkte;
  }


}
