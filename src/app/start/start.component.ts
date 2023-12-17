import { Component } from '@angular/core';
import { faHandPointLeft, faHandPointRight } from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.scss']
})
export class StartComponent {


    showTeaser = false;

    faHandPointRight = faHandPointRight;
    faHandPointLeft = faHandPointLeft;


}
