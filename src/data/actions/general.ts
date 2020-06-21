import { ActionFC, Action } from './';
import * as consts from '../consts/general';
import { User } from '../../types';

export const setCurrentPage: ActionFC<string, string> = (page: string): Action<string> => ({
  type: consts.SET_CURRENT_PAGE,
  payload: page,
});

export const setSearchResults: ActionFC<User[], User[]> = (search: User[]): Action<User[]> => ({
  type: consts.SET_SEARCH_RESULTS,
  payload: search,
});

export const setHeaderMessage: ActionFC<{ [key: string]: string }, { [key: string]: string }> = (message: { [key: string]: string }): Action<{ [key: string]: string }> => ({
  type: consts.SET_HEADER_MESSAGE,
  payload: message,
});
