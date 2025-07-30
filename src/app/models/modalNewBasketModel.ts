import {AdherentModel} from './adherentModel';
import {GroupActivityModel} from './groupActivityModel';

export interface ModalNewBasketModel {
  listAdherent: AdherentModel[];
  listGroupActivity: GroupActivityModel[];
}
