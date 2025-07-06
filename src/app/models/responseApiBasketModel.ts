import {StateApiModel} from './stateApiModel';
import {BasketModel} from './basketModel';
import {AdherentBasketModel} from './adherentBasketModel';

export interface ResponseApiBasketModel {
  response?: BasketModel[];
  stateApi?: StateApiModel;
}

export interface ResponseApiAdherentBasketModel {
  response?: AdherentBasketModel[];
  stateApi?: StateApiModel;
}

