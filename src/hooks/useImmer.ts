import { produce, Draft, freeze } from 'immer';
import { useCallback, useState } from 'react';

export type DraftFunction<S> = (draft: Draft<S>) => void;
export type Updater<S> = (arg: S | DraftFunction<S>) => void;
export type ImmerHook<S> = [S, Updater<S>];
//函数签名
export function useImmer<S = unknown>(initialValue: S | (() => S)): ImmerHook<S>;

export function useImmer<T>(initialValue: T) {
  const [val, updateValue] = useState(() =>
    freeze(typeof initialValue === 'function' ? initialValue() : initialValue, true),
  );

  return [
    val,
    useCallback((updater: Updater<T>) => {
      if (typeof updater === 'function') {
        updateValue(produce(updater));
      } else {
        updateValue(freeze(updater));
      }
    }, []),
  ];
}

// export function useImmerState<T>(
//   initialState: T | (() => T)
// ): [T, (updater: (draft: Draft<T>) => void | T) => void] {
//   const [state, setState] = useState<T>(initialState);

//   const updateState = useCallback((updater: (draft: Draft<T>) => void | T) => {
//     setState(produce(updater));
//   }, []);

//   return [state, updateState];
// }

// const [a, setA] = useImmer(1);

// setA(20)

// setA((a_temp) => {
//   a_temp.a = a_temp.a + 1;
// });
