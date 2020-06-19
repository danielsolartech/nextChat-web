import { ActionFC, Action } from './';
import * as consts from '../consts/general';

export const setCurrentPage: ActionFC<string, string> = (page: string): Action<string> => ({
  type: consts.SET_CURRENT_PAGE,
  payload: page,
});
