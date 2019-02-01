import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-umfrage',
    templateUrl: './umfrage.component.html',
    styleUrls: ['./umfrage.component.css']
})
export class UmfrageComponent implements OnInit {


    name = '';
    kategorie = 'Ohne Kategorie';
    these = '';

    thesen = [];

    isLoading = false;


    constructor(private http: HttpClient, private toastr: ToastrService) {
    }


    ngOnInit() {
        this.ladeThesen();
    }


    theseAbschicken() {

        const payload = {
            name: this.name.trim(),
            kategorie: this.kategorie,
            these: this.these.trim()
        };

        this.isLoading = true;

        this.http
            .post('https://magdomat-functions.azurewebsites.net/api/AddEntry', payload)
            .subscribe(() => {

                this.ladeThesen();
                this.kategorie = 'Ohne Kategorie';
                this.these = '';

                this.isLoading = false;

                this.toastr.success('Ihre These ist bei uns eingegangen.', 'Vielen Dank!');

            }, err => {
                this.isLoading = false;
                this.toastr.error('Bitte versuchen Sie es zu einem späteren Zeitpunkt nochmal.', 'Es gab einen Fehler');
            });

    }


    private ladeThesen() {

        const compare = (a, b) => {

            if (a.datum < b.datum) {
                return 1;
            }

            if (a.datum > b.datum) {
                return -1;
            }

            return 0;

        };

        this.http
            .get('https://magdomat-functions.azurewebsites.net/api/GetEntries')
            .subscribe((entries: any[]) => {

                this.thesen = entries.map(entry => {

                    const name = entry.Name ? entry.Name._.trim() : '';
                    const kategorie = entry.Kategorie ? entry.Kategorie._.trim() : 'Ohne Kategorie';

                    return {
                        datum: entry.Timestamp._,
                        name: name === '' ? 'Anonym' : name,
                        kategorie,
                        these: entry.These._.trim()
                    };

                }).sort(compare);

            }, () => this.toastr.error('Bitte versuchen Sie es zu einem späteren Zeitpunkt nochmal.', 'Es gab einen Fehler'));

    }


}
