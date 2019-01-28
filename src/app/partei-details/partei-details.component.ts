import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-partei-details',
    templateUrl: './partei-details.component.html',
    styleUrls: ['./partei-details.component.css']
})
export class ParteiDetailsComponent {


    partei = null;
    wahl = environment.wahl;


    constructor(public bsModalRef: BsModalRef) {
    }


}
