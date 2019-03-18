import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ParteiDetailsComponent } from '../partei-details/partei-details.component';
import { TheseDetailsComponent } from '../these-details/these-details.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Component({
    selector: 'app-thesen-check',
    templateUrl: './thesen-check.component.html',
    styleUrls: ['./thesen-check.component.css']
})
export class ThesenCheckComponent implements OnInit {


    modus = 'Eingabe';

    thesen = [];
    parteien = [];
    ergebnisseThesen = [];
    ergebnisseParteien = [];

    aktuelleTheseIndex = -1;
    aktuelleThese = null;

    wahl = environment.wahl;

    modalRef: BsModalRef;


    constructor(private modalService: BsModalService, private http: HttpClient) {
    }


    ngOnInit() {
        this.neustart();
    }


    waehleThese(index: number) {
        this.aktuelleTheseIndex = index;
        this.aktuelleThese = this.thesen[this.aktuelleTheseIndex];
    }


    stimmeJa() {
        this.aktuelleThese.wertung = 'ja';
        this.aktuelleThese.gewertet = true;
        this.naechsteTheseOderAuswertung();
    }


    stimmeEgal() {
        this.aktuelleThese.wertung = 'neutral';
        this.aktuelleThese.gewertet = true;
        this.naechsteTheseOderAuswertung();
    }


    stimmeNein() {
        this.aktuelleThese.wertung = 'nein';
        this.aktuelleThese.gewertet = true;
        this.naechsteTheseOderAuswertung();
    }


    ueberspringen() {
        this.aktuelleThese.wertung = 'ohne';
        this.aktuelleThese.gewertet = false;
        this.naechsteTheseOderAuswertung();
    }


    zurueck() {

        if (this.aktuelleTheseIndex > 0) {
            this.waehleThese(this.aktuelleTheseIndex - 1);
        }

    }


    async neustart() {
        this.modus = 'Eingabe';
        await this.ladeThesen();
        await this.ladeParteien();
        this.waehleThese(0);
    }


    zeigePartei(partei: any) {
        this.modalRef = this.modalService.show(ParteiDetailsComponent, { initialState: { partei }});
    }


    zeigeThese(these: any) {
        this.modalRef = this.modalService.show(TheseDetailsComponent, { initialState: { these, anzahlThesen: this.thesen.length, parteien: this.parteien }});
    }


    private ladeThesen() {

        return new Promise((resolve, reject) => {

            this.http
                .get<any>(`assets/${this.wahl}/thesen.json`)
                .subscribe(thesen => {

                    this.thesen = _.map(thesen, these => ({
                        id: these.id,
                        text: these.text,
                        doppeltGewertet: false,
                        gewertet: false,
                        wertung: 'ohne'
                    }));

                    resolve();

                }, err => reject(err));

        });

    }


    private ladeParteien() {

        return new Promise((resolve, reject) => {

            this.http
                .get<any>(`assets/${this.wahl}/parteien.json`)
                .subscribe(parteien => {
                    this.parteien = parteien;
                    resolve();
                }, err => reject(err));

        });

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

            const maxPunkte = _.sumBy(this.ergebnisseThesen, 'maxPunkte');

            this.ergebnisseParteien = [];
            for (const partei of this.parteien) {

                this.ergebnisseParteien.push({
                    partei,
                    prozent: this.berechneProzent(partei, maxPunkte)
                });

            }

            this.ergebnisseParteien = _.orderBy(this.ergebnisseParteien, 'prozent', 'desc');

        } else {
            this.waehleThese(this.aktuelleTheseIndex + 1);
        }

    }


    private bestimmeMaxPunkte(these): number {

        const punkteProPartei = _.map(this.parteien, partei => {

            const wertungPartei =  partei.thesen[these.id];

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

        return _.max(punkteProPartei);

    }


    private berechneProzent(partei, maxPunkte: number): number {

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
