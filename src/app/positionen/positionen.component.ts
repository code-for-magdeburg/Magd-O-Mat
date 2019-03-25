import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { environment } from '../../environments/environment';
import { SicherheitscodeModalComponent } from './sicherheitscode-modal/sicherheitscode-modal.component';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';


@Component({
    selector: 'app-positionen',
    templateUrl: './positionen.component.html',
    styleUrls: ['./positionen.component.css']
})
export class PositionenComponent implements OnInit {


    sicherheitscode = '';
    partei = null;
    beschreibung = '';
    positionen = [];

    wahl = environment.wahl;
    isLoadingPartei = false;
    isLoadingPositionen = false;

    modalRef: BsModalRef;


    constructor(private modalService: BsModalService, private http: HttpClient, private toastr: ToastrService) {
    }


    async ngOnInit() {

        this.sicherheitscode = await this.sicherheitscodeAbfragen();

        try {
            await this.ladePartei();
        } catch (err) {

            if (err && err.status === 404) {
                this.ngOnInit();
            }

        }

        await this.ladePositionen();

    }


    beschreibungSpeichern() {

        this.isLoadingPartei = true;

        this.http
            .post('https://magdomat-functions.azurewebsites.net/api/UpdatePartei', {
                sicherheitscode: this.sicherheitscode,
                beschreibung: this.beschreibung
            })
            .subscribe(() => {
                this.isLoadingPartei = false;
                this.toastr.success('Die Kurzbeschreibung ist bei uns eingegangen.', 'Vielen Dank!');
            }, err => {
                this.isLoadingPartei = false;
                this.toastr.error('Bitte versuchen Sie es zu einem späteren Zeitpunkt nochmal.', 'Es gab einen Fehler');
            });

    }


    positionJa(position: any) {
        this.speicherePosition(position, 'ja');
    }


    positionNeutral(position: any) {
        this.speicherePosition(position, 'neutral');
    }


    positionNein(position: any) {
        this.speicherePosition(position, 'nein');
    }


    private sicherheitscodeAbfragen(): Promise<string> {

        return new Promise((resolve) => {

            this.modalRef = this.modalService.show(SicherheitscodeModalComponent, { backdrop: true, ignoreBackdropClick: true, keyboard: false });
            const subscriber = this.modalService.onHide.subscribe(result => {
                subscriber.unsubscribe();
                resolve(this.modalRef.content.sicherheitscode);
            });

        });

    }


    private ladePartei(): Promise<any> {

        return new Promise(async (resolve, reject) => {

            this.isLoadingPartei = true;

            try {
                this.partei = await this.http.get(`https://magdomat-functions.azurewebsites.net/api/GetPartei?sicherheitscode=${this.sicherheitscode}`).toPromise();
                this.beschreibung = this.partei.Beschreibung._.trim();
                resolve();
            } catch (err) {

                reject(err);

                if (err && err.status === 404) {
                    this.toastr.error('Der angegebene Sicherheitscode ist ungültig.', 'Es gab einen Fehler', { timeOut: 5000 });
                } else {
                    this.toastr.error('Bitte versuchen Sie es zu einem späteren Zeitpunkt nochmal.', 'Es gab einen Fehler');
                }

            }

            this.isLoadingPartei = false;

        });

    }


    private async ladePositionen(): Promise<any> {

        return new Promise(async (resolve, reject) => {

            this.isLoadingPositionen = true;

            try {

                const positionen = await this.http.get<any[]>(`https://magdomat-functions.azurewebsites.net/api/GetPositionen?sicherheitscode=${this.sicherheitscode}`).toPromise();
                this.positionen = positionen
                    .map(position => ({
                        theseId: position.RowKey._.trim(),
                        these: position.These._.trim(),
                        wertung: position.Wertung._.trim()
                    }));

                resolve();

            } catch (err) {
                reject(err);
                this.toastr.error('Bitte versuchen Sie es zu einem späteren Zeitpunkt nochmal.', 'Es gab einen Fehler');
            }

            this.isLoadingPositionen = false;

        });

    }


    private speicherePosition(position: any, wertung: string) {

        this.http
            .post('https://magdomat-functions.azurewebsites.net/api/UpdatePosition', {
                sicherheitscode: this.sicherheitscode,
                theseId: position.theseId,
                wertung
            })
            .subscribe(() => {
                position.wertung = wertung;
            }, err => {
                this.toastr.error('Bitte versuchen Sie es zu einem späteren Zeitpunkt nochmal.', 'Es gab einen Fehler');
            });

    }


}
