import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faFrown, faMeh, faSmile } from '@fortawesome/free-regular-svg-icons';
import { TheseEingabe, TheseWertung } from '../../model/These';


@Component({
  selector: 'app-these-buttons',
  templateUrl: './these-buttons.component.html',
  styleUrls: ['./these-buttons.component.scss']
})
export class TheseButtonsComponent {


  protected readonly faMeh = faMeh;
  protected readonly faSmile = faSmile;
  protected readonly faFrown = faFrown;

  @Input() theseEingabe!: TheseEingabe;

  @Output() wertung = new EventEmitter<TheseWertung>();


  handleWertung(wertung: TheseWertung) {
    this.wertung.emit(wertung);
  }


}
