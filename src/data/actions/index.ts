export type ActionFC<T, V> = (props: T) => Action<V>;

export interface Action<T> {
  type: string;
  payload: T;
}