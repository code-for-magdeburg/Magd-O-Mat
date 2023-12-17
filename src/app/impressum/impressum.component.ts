import { Component } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'app-impressum',
    templateUrl: './impressum.component.html',
    styleUrls: ['./impressum.component.scss']
})
export class ImpressumComponent {
  faArrowLeft = faArrowLeft;
}
