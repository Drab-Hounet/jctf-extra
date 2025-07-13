import {AdherentModel} from './adherentModel';

export interface AdherentBasketModel extends AdherentModel {
  idBasket: number;
  basketAmountDetails?: BasketAmountDetailsModel
}

export interface BasketAmountDetailsModel {
  licenceAmount: number;
  adhesionAmount: number;

  reductionActivity: number;
  reductionFamily: number;

  totalPayment: number;
}
