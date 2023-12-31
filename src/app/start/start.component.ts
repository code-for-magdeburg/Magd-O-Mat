import { Component } from '@angular/core';
import { faHandPointLeft, faHandPointRight } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent {


  protected readonly showTeaser = false;

  protected readonly faHandPointRight = faHandPointRight;
  protected readonly faHandPointLeft = faHandPointLeft;


}
