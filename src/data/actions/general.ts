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

export const setAuthUser: ActionFC<User | null, User | null> = (user: User | null): Action<User | null> => ({
  type: consts.SET_AUTH_USER,
  payload: user,
});

export const setServiceWorker: ActionFC<ServiceWorkerRegistration | null, ServiceWorkerRegistration | null> = (sw: ServiceWorkerRegistration | null): Action<ServiceWorkerRegistration | null> => ({
  type: consts.SET_SERVICE_WORKER,
  payload: sw,
});

export const setNotificationCount: ActionFC<number, number> = (count: number): Action<number> => ({
  type: consts.SET_NOTIFICATION_COUNT,
  payload: count,
});

export const setProfileSettings: ActionFC<{ [key: string]: any }, { [key: string]: any }> = (settings: { [key: string]: any }): Action<{ [key: string]: any }> => ({
  type: consts.SET_PROFILE_SETTINGS,
  payload: settings,
});
