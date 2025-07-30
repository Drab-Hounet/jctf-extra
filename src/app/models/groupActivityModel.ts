import {CategoryEnum} from '../shared/enum/categoryEnum';

export interface GroupActivityModel {
  activityName: string;
  groupName: string;
  nbPlace?: number;
  listCategories: CategoryEnum[];
}
