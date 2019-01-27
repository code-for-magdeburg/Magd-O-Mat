import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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


    constructor(private http: HttpClient) {
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

                // TODO: Handle success

                this.ladeThesen();
                this.kategorie = 'Ohne Kategorie';
                this.these = '';

                this.isLoading = false;

            }, err => {
                // TODO: Handle error
                this.isLoading = false;
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

            }, err => {
                // TODO: Handle error
            });

    }


}
