import {AdherentModel} from './adherentModel';

export interface AdhesionModel {
  eveilJudoAmount?: number;
  miniPoussinAmount?: number;
  poussinAmount?: number;
  benjaminAmount?: number;
  minimeAmount?: number;
  cadetAmount?: number;
  juniorAmount?: number;
  seniorAmount?: number;
  inscriptionAvailable?:boolean;

  // gestionLicence?: FinanceInformationModel;
  id: number;
  beginYear?: number;
  endYear?: number;
  listAdherent?: AdherentModel[];
  listAdherentBasket?: AdherentModel[];
  numberAdherent?: number;
  passeport?: number;
  reducFamilleAmount?: number;
  reductionActivite?: number;
  licence?: number;
}
