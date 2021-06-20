type RootReducer<S, A = never> = (state: S | undefined, action: A) => S;

type ReducerMap<T extends Record<string, any>, A> = {
  [K in keyof T]: RootReducer<T[K], A>;
};

type ReducerMapState<T> = T extends ReducerMap<infer R, any> ? R : never;
type ReducerMapAction<T> = T extends ReducerMap<any, infer R> ? R : never;

const compositeReducer = <
  S extends Record<string, any>,
  A extends Record<string, any>,
  M extends ReducerMap<Record<string, any>, any>
>(
  rootReducer: RootReducer<S, A>,
  reducers: M
): RootReducer<S & ReducerMapState<M>, A | ReducerMapAction<M>> => (
  state,
  action
) =>
  Object.keys(reducers).reduce((acc, key) => {
    if (acc) {
      const subState = reducers[key]!(acc[key], action as ReducerMapAction<M>);
      if (subState !== acc[key]) {
        return {
          ...acc,
          [key]: subState
        };
      }
    }

    return acc;
  }, rootReducer(state, action as A) as S & ReducerMapState<M>);

export default compositeReducer;
