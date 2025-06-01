import { AuthModel } from './authModel';
import { StateApiModel } from './stateApiModel';
import {UserModel} from './userModel';

export interface ResponseUserApiModel {
  response?: UserModel[];
  stateApi?: StateApiModel;
}
