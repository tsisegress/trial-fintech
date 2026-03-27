import createStore from "./createStore.js";

const matchStore = createStore({
  selectedMatchId: "",
  selectedSource: "",
  filters: {
    type: "All",
    sector: "All",
    stage: "All",
    region: "All",
  },
  pipeline: [],
  activity: [],
});

export function useMatchStore(selector) {
  return matchStore.useStore(selector);
}

export function setMatchStore(partial) {
  matchStore.setState(partial);
}

export function addPipelineItem(item) {
  matchStore.setState((prev) => {
    const existing = Array.isArray(prev.pipeline) ? prev.pipeline : [];
    const deduped = existing.filter((row) => row.id !== item.id);
    return { pipeline: [item, ...deduped] };
  });
}

export function setSelectedMatchId(selectedMatchId, selectedSource = "") {
  matchStore.setState({ selectedMatchId, selectedSource });
}

export function clearSelectedMatchContext() {
  matchStore.setState({ selectedMatchId: "", selectedSource: "" });
}

export function addMatchActivity(item) {
  matchStore.setState((prev) => {
    const existing = Array.isArray(prev.activity) ? prev.activity : [];
    const normalized = {
      id: item.id || `activity-${Date.now()}`,
      title: item.title || "Activity",
      detail: item.detail || "",
      tone: item.tone || "info",
      timestamp: item.timestamp || new Date().toISOString(),
    };
    return { activity: [normalized, ...existing].slice(0, 20) };
  });
}

export function getMatchStore() {
  return matchStore.getState();
}
