import * as consts from '../consts/general';
import { Reducer } from '.';
import { Action } from '../actions';
import { User } from '../../types';

export interface GeneralState {
  currentPage: string;
  search_results: User[];
  header_message: { [key: string]: string };
}

const defaultState: GeneralState = {
  currentPage: '',
  search_results: [],
  header_message: {},
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

    default: {
      return state;
    }
  }
};

export default generalReducer;
