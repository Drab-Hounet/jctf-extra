import {AdherentModel} from './adherentModel';

export interface AdherentBasketModel extends AdherentModel {
  idBasket: number;
  mail?: string;
  judo?: boolean;
  jujitsu?: boolean;
  taiso?: boolean;
  jjb?: boolean;
}
