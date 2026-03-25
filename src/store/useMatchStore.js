import createStore from "./createStore.js";

const matchStore = createStore({
  selectedMatchId: "",
  filters: {
    type: "All",
    sector: "All",
    stage: "All",
    region: "All",
  },
});

export function useMatchStore(selector) {
  return matchStore.useStore(selector);
}

export function setMatchStore(partial) {
  matchStore.setState(partial);
}

export function getMatchStore() {
  return matchStore.getState();
}
