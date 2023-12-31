import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faArrowLeft, faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { TheseEingabe } from '../../model/These';


@Component({
  selector: 'app-these-card',
  templateUrl: './these-card.component.html',
  styleUrls: ['./these-card.component.scss']
})
export class TheseCardComponent {


  protected readonly faArrowLeft = faArrowLeft;
  protected readonly fasHeart = fasHeart;
  protected readonly farHeart = farHeart;

  @Input() theseEingabe!: TheseEingabe;
  @Input() theseIndex = -1;
  @Input() anzahlThesen = 0;

  @Output() zurueck = new EventEmitter<void>();
  @Output() ueberspringen = new EventEmitter<void>();


  handleZurueck() {
    this.zurueck.emit();
  }


  handleUeberspringen() {
    this.ueberspringen.emit();
  }


}
