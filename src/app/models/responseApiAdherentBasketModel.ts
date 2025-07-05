import {StateApiModel} from './stateApiModel';
import {BasketModel} from './basketModel';

export interface ResponseApiAdherentBasketModel {
  response?: BasketModel[];
  stateApi?: StateApiModel;
}
