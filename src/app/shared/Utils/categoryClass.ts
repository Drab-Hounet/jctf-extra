import {CategoryEnum} from '../enum/categoryEnum';

export class CategoryClass {
  private eveilJudoAmount!: number;
  private miniPoussinAmount!: number;
  private poussinAmount!: number;
  private benjaminAmount!: number;
  private minimeAmount!: number;
  private cadetAmount!: number;
  private juniorAmount!: number;
  private seniorAmount!: number;

  constructor() {
  }

  getCategory(age: number) {
    switch (age) {
      case 3:
      case 4:
      case 5:
        return CategoryEnum.eveilJudo;
      case 6:
      case 7:
        return CategoryEnum.miniPoussin;
      case 9:
      case 8:
        return CategoryEnum.poussin;
      case 10:
      case 11:
        return CategoryEnum.benjamin;
      case 12:
      case 13:
        return CategoryEnum.minime;
      case 14:
      case 15:
      case 16:
        return CategoryEnum.cadet;
      case 18:
      case 19:
      case 20:
        return CategoryEnum.junior;
      default:
        return CategoryEnum.senior;
    }
  }

  setAdhesionAmount(
    eveilJudoAmount: number,
    miniPoussinAmount: number,
    poussinAmount: number,
    benjaminAmount: number,
    minimeAmount: number,
    cadetAmount: number,
    juniorAmount: number,
    seniorAmount: number,
  ) {

    this.eveilJudoAmount = eveilJudoAmount;
    this.miniPoussinAmount = miniPoussinAmount;
    this.poussinAmount = poussinAmount;
    this.benjaminAmount = benjaminAmount;
    this.minimeAmount = minimeAmount;
    this.cadetAmount = cadetAmount;
    this.juniorAmount = juniorAmount;
    this.seniorAmount = seniorAmount;
  }

  getCategoryAmount(beginYearAdhesion: number, dateBirth: Date): number {
    const age = beginYearAdhesion - dateBirth.getFullYear();
    const category = this.getCategory(age);
    switch (category) {
      case CategoryEnum.eveilJudo:
        return this.eveilJudoAmount;
      case CategoryEnum.miniPoussin:
        return this.miniPoussinAmount;
      case CategoryEnum.poussin:
        return this.poussinAmount;
      case CategoryEnum.benjamin:
        return this.benjaminAmount;
      case CategoryEnum.minime:
        return this.minimeAmount;
      case CategoryEnum.cadet:
        return this.cadetAmount;
      case CategoryEnum.junior:
        return this.juniorAmount;
      case CategoryEnum.senior:
        return this.seniorAmount;
    }
  }
}
