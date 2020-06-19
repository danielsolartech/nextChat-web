import { Action } from "../actions";

export type Reducer<T, V> = (state: T, action: Action<V>) => T;
