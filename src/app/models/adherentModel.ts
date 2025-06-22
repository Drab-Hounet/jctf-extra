import {AdhesionModel} from './adhesionModel';
import {FamilleModel} from './familleModel';

export interface AdherentModel {
  adress?: string;
  birth?: Date;
  category?: string;
  codePostal?: string;
  dateCertificat?: Date;
  // financeInformation?: FinanceInformationModel;
  id?: number;
  judo?: boolean;
  jujitsu?: boolean;
  listAdhesion?: AdhesionModel[];
  adhesionEncours?: AdhesionModel;
  mail?: string;
  name?: string;
  famille?: FamilleModel;
  familleNom?: string;
  phone?: string;
  phoneFixe?: string;
  phoneOffice?: string;
  sexe?: string;
  surname?: string;
  taiso?: boolean;
  jjb?: boolean;
  ville?: string;

  nbAdhesion?: number;

  hasParent?: boolean;
  parent1?: string;
  adresseParent1?: string;
  postalParent1?: string;
  villeParent1?: string;
  mailParent1?: string;

  parent2?: string;
  adresseParent2?: string;
  postalParent2?: string;
  villeParent2?: string;
  mailParent2?: string;

  adherentCommentaire?: string;

  statutPaiement?: boolean;

  isSelected?: boolean;
  isHighlight?: boolean;

  // informationsCompressed?: InformationsCompressed;
}
