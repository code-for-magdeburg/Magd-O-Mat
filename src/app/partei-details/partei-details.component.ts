import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';


@Component({
    selector: 'app-partei-details',
    templateUrl: './partei-details.component.html',
    styleUrls: ['./partei-details.component.css']
})
export class ParteiDetailsComponent implements OnInit {


    partei = null;
    wahl = environment.wahl;
    thesen: any[] = null;


    constructor(public bsModalRef: BsModalRef) {
    }


    ngOnInit(): void {
        _.forEach(this.thesen, (these, index) => these.wertungPartei = this.partei.thesen[index]);
    }


}
