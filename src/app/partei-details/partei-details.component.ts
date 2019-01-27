import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';


@Component({
    selector: 'app-partei-details',
    templateUrl: './partei-details.component.html',
    styleUrls: ['./partei-details.component.css']
})
export class ParteiDetailsComponent {


    partei = null;


    constructor(public bsModalRef: BsModalRef) {
    }


}
