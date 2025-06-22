import {AdherentModel} from './adherentModel';

export interface FamilleModel {
  id: number;
  nom: string;
  members?: AdherentModel[];
}
