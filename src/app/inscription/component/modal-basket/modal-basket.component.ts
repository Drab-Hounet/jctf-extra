import {Component, EventEmitter, Input, Output, output} from '@angular/core';
import {AdherentBasketModel} from '../../../models/adherentBasketModel';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DatePipe, NgFor, NgIf} from '@angular/common';
import {DividerModule} from 'primeng/divider';
import {TagModule} from 'primeng/tag';
import {TooltipModule} from 'primeng/tooltip';

@Component({
  selector: 'app-modal-basket',
  imports: [DialogModule,
    ButtonModule,
    NgFor,
    NgIf,
    DividerModule,
    DatePipe,
    TagModule,
    TooltipModule
  ], standalone: true,
  templateUrl: './modal-basket.component.html',
  styleUrl: './modal-basket.component.scss'
})
export class ModalBasketComponent {
  _visible = false;
  _baskets: AdherentBasketModel[] | null = null;
  _totalPrice: number = 0;

  @Input()
  get iOpenModal(): boolean | null {
    return this._visible;
  }

  set iOpenModal(visible: boolean | null) {
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
      this.fillBaskets(baskets);
    }
  }

  @Output()
  oDeleteBasket: EventEmitter<number | null> = new EventEmitter<number | null>();

  @Output()
  oDeleteAllBasket: EventEmitter<boolean> = new EventEmitter<boolean>();


  fillBaskets(baskets: AdherentBasketModel[]) {
    this._totalPrice = 0;
    for (let basket of baskets) {
      this._totalPrice = this._totalPrice + (basket.basketAmountDetails?.totalPayment ?? 0);
    }
    this._baskets = baskets;

  }

  onDeleteBasket(idBasket: number) {
    this._visible = false;
    this.oDeleteBasket.emit(idBasket);
  }

  onDeleteAll() {
    this._visible = false;
    this.oDeleteAllBasket.emit(true);
  }

  onPaiement() {

  }

  onCloseModal() {
    this._visible = false;
    this.oDeleteBasket.emit(null);
  }
}
