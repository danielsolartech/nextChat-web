import * as consts from '../consts/general';
import { Reducer } from '.';
import { Action } from '../actions';

export interface GeneralState {
  currentPage: string;
}

const defaultState: GeneralState = {
  currentPage: '',
};

type ActionType = string;

const generalReducer: Reducer<GeneralState, ActionType> = (state: GeneralState = defaultState, action: Action<ActionType>): GeneralState => {
  switch (action.type) {
    case consts.SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default generalReducer;
