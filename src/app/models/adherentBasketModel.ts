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

  tattooCode: string;
  tattooAmount: number;
  passSportCode: string;
  passSportAmount: number;
  passRegionCode: string;
  passRegionPin:string;
  passRegionAmount: number;

  totalReduction: number;

  totalPayment: number;
}
