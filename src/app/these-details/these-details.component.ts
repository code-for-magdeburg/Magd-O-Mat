import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';


@Component({
    selector: 'app-these-details',
    templateUrl: './these-details.component.html',
    styleUrls: ['./these-details.component.css']
})
export class TheseDetailsComponent {


    these = null;
    anzahlThesen: number = null;
    parteien = null;


    constructor(public bsModalRef: BsModalRef) {
    }


}
