import * as consts from '../consts/general';
import { Reducer } from '.';
import { Action } from '../actions';
import { User } from '../../types';

export interface GeneralState {
  currentPage: string;
  search_results: User[];
  header_message: { [key: string]: string };
  auth_user: User | null;
  service_worker: ServiceWorkerRegistration | null;
  notification_count: number;
  profile_settings: { [key: string]: any };
}

const defaultState: GeneralState = {
  currentPage: '',
  search_results: [],
  header_message: {},
  auth_user: null,
  service_worker: null,
  notification_count: 0,
  profile_settings: {},
};

const generalReducer: Reducer<GeneralState, any> = (state: GeneralState = defaultState, action: Action<any>): GeneralState => {
  switch (action.type) {
    case consts.SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.payload,
      };
    }

    case consts.SET_SEARCH_RESULTS: {
      return {
        ...state,
        search_results: action.payload,
      };
    }

    case consts.SET_HEADER_MESSAGE: {
      return {
        ...state,
        header_message: action.payload,
      };
    }

    case consts.SET_AUTH_USER: {
      return {
        ...state,
        auth_user: action.payload,
      };
    }

    case consts.SET_SERVICE_WORKER: {
      return {
        ...state,
        service_worker: action.payload,
      };
    }

    case consts.SET_NOTIFICATION_COUNT: {
      return {
        ...state,
        notification_count: action.payload,
      };
    }

    case consts.SET_PROFILE_SETTINGS: {
      return {
        ...state,
        profile_settings: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default generalReducer;
