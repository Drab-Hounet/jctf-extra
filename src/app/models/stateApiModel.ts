export interface StateApiModel {
  log?: string;
  status?: StateApiModel.StatusEnum;
}

export namespace StateApiModel {
  export type StatusEnum = 'success' | 'error' | 'session error';
  export const StatusEnum = {
    Success: 'Success' as StatusEnum,
    Error: 'Error' as StatusEnum,
    SessionError: 'SessionError' as StatusEnum,
    DeleteImpossible: 'DeleteImpossible' as StatusEnum
  };
}
