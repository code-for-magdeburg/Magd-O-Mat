import { Component } from '@angular/core';
import { faHandPointLeft, faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent {


  protected readonly showTeaser = environment.showTeaser;

  protected readonly faHandPointRight = faHandPointRight;
  protected readonly faHandPointLeft = faHandPointLeft;


}
