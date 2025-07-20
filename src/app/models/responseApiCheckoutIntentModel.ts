import {StateApiModel} from './stateApiModel';
import {ResponseCheckoutIntentModel} from './responseCheckoutIntentModel';

export interface ResponseApiCheckoutIntentModel {
  response?: ResponseCheckoutIntentModel[];
  stateApi?: StateApiModel;
}
