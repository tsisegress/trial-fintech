import { useSyncExternalStore } from "react";

export default function createStore(initialState) {
  let state = initialState;
  const listeners = new Set();

  const getState = () => state;

  const setState = (partial) => {
    const next = typeof partial === "function" ? partial(state) : partial;
    state = { ...state, ...next };
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const useStore = (selector = (s) => s) => {
    return useSyncExternalStore(subscribe, () => selector(state), () => selector(state));
  };

  return {
    getState,
    setState,
    useStore,
  };
}
