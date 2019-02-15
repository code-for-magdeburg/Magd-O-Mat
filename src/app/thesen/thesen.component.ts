import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-thesen',
    templateUrl: './thesen.component.html',
    styleUrls: ['./thesen.component.css']
})
export class ThesenComponent implements OnInit {


    thesen = null;

    isLoadingEntries = false;


    constructor(private http: HttpClient, private toastr: ToastrService) {
    }


    ngOnInit() {
        this.ladeThesen();
    }


    private ladeThesen() {

        const compare = (a, b) => {

            if (a.nr < b.nr) {
                return -1;
            }

            if (a.nr > b.nr) {
                return 1;
            }

            return 0;

        };

        this.isLoadingEntries = true;

        this.http
            .get('https://magdomat-functions.azurewebsites.net/api/GetEntries')
            .subscribe((entries: any[]) => {

                this.thesen = entries
                    .map((entry, index) => {

                        const name = entry.Name ? entry.Name._.trim() : '';
                        const kategorie = entry.Kategorie ? entry.Kategorie._.trim() : 'Ohne Kategorie';

                        return {
                            nr: index + 1,
                            datum: entry.Timestamp._,
                            name: name === '' ? 'Anonym' : name,
                            kategorie,
                            these: entry.These._.trim(),
                            geloescht: entry.Geloescht._
                        };

                    })
                    .filter(entry => !entry.geloescht)
                    .sort(compare);

                this.isLoadingEntries = false;

            }, () => {
                this.isLoadingEntries = false;
                this.toastr.error('Bitte versuchen Sie es zu einem späteren Zeitpunkt nochmal.', 'Es gab einen Fehler');
            });

    }


}
