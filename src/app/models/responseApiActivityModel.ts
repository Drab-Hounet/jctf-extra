import {StateApiModel} from './stateApiModel';
import {GroupActivityModel} from './groupActivityModel';

export interface ResponseApiActivityModel {
  response?: GroupActivityModel[];
  stateApi?: StateApiModel;
}
