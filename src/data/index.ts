import { createStore, combineReducers } from 'redux';
import general, { GeneralState } from './reducers/general';

export interface Reducers {
  general: GeneralState,
}

export default createStore(combineReducers({
  general,
}));
