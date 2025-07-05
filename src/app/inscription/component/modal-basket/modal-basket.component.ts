import {Component, EventEmitter, Input, Output, output} from '@angular/core';
import {AdherentBasketModel} from '../../../models/adherentBasketModel';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DatePipe, NgFor, NgIf} from '@angular/common';
import {DividerModule} from 'primeng/divider';
import {TagModule} from 'primeng/tag';

@Component({
  selector: 'app-modal-basket',
  imports: [DialogModule,
    ButtonModule,
    NgFor,
    NgIf,
    DividerModule,
    DatePipe,
    TagModule
  ], standalone: true,
  templateUrl: './modal-basket.component.html',
  styleUrl: './modal-basket.component.scss'
})
export class ModalBasketComponent {
  _visible = false;

  _baskets: AdherentBasketModel[] | null = null;

  @Input()
  get iOpenModal(): boolean | null {
    return this._visible;
  }

  set iOpenModal(visible: boolean | null ) {
    if (visible) {
      this._visible = visible;
    }
  }

  @Input()
  get iBaskets(): AdherentBasketModel[] | null {
    return this._baskets;
  }

  set iBaskets(baskets: AdherentBasketModel[] | null) {
    if (baskets) {
      this._baskets = baskets;
    }
  }

  @Output()
  oModalClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  onDeleteBasket(idBasket:number) {

  }

  onDeleteAll() {

  }

  onPaiement() {

  }

  onCloseModal() {
    this._visible = false;
    this.oModalClose.emit(true);
  }
}
