import { AuthModel } from './authModel';
import { StateApiModel } from './stateApiModel';

export interface ResponseAuthApiModel {
  response?: AuthModel[];
  stateApi?: StateApiModel;
}
