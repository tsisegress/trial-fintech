import createStore from "./createStore.js";

const userStore = createStore({
  role: "founder",
  name: "",
  fullName: "",
  email: "",
  orgName: "",
  sectors: ["Fintech", "AI/ML"],
});

export function useUserStore(selector) {
  return userStore.useStore(selector);
}

export function setUserProfile(partial) {
  userStore.setState(partial);
}

export function getUserProfile() {
  return userStore.getState();
}
