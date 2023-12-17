import { Component } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-tagebuch',
  templateUrl: './tagebuch.component.html',
  styleUrls: ['./tagebuch.component.scss']
})
export class TagebuchComponent {
  faArrowLeft = faArrowLeft;
}
