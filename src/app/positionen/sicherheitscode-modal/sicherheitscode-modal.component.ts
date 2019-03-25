import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';


@Component({
    selector: 'app-sicherheitscode-modal',
    templateUrl: './sicherheitscode-modal.component.html',
    styleUrls: ['./sicherheitscode-modal.component.css']
})
export class SicherheitscodeModalComponent {


    sicherheitscode = '';


    constructor(public bsModalRef: BsModalRef) {
    }


}
