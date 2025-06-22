import {AdhesionModel} from './adhesionModel';
import {StateApiModel} from './stateApiModel';

export interface ResponseAdhesionApiModel {
  response?: AdhesionModel[];
  stateApi?: StateApiModel;
}
