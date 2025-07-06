import {AdherentModel} from './adherentModel';
import {StateApiModel} from './stateApiModel';

export interface ResponseAdherentApiModel {
  response?: AdherentModel[];
  stateApi?: StateApiModel  ;
}
