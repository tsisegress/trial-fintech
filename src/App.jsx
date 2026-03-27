import { useState } from "react";
import DashboardPage from "./pages/DashboardPage";
import DiscoverPage from "./pages/DiscoverPage";
import LandingPage from "./pages/LandingPageFull";
import OnboardingPage from "./pages/Onboardingpage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import ChatBotPage from "./pages/ChatBotPage";
import { setUserProfile, useUserStore } from "./store/useUserStore";

export default function App() {
  const [route, setRoute] = useState("landing");
  const profile = useUserStore((state) => state);

  const navigate = (next, payload) => {
    if (payload && typeof payload === "object") {
      setUserProfile(payload);
    }
    setRoute(next);
  };

  if (route === "landing") return <LandingPage onNavigate={navigate} />;
  if (route === "onboarding") return <OnboardingPage onNavigate={navigate} />;
  if (route === "discover") return <DiscoverPage profile={profile} onNavigate={navigate} />;
  if (route === "profile") return <ProfilePage initialProfile={profile} onNavigate={navigate} />;
  if (route === "search") return <SearchPage onNavigate={navigate} />;
  if (route === "dashboard") return <DashboardPage onNavigate={navigate} />;
  if (route === "chatbot") return <ChatBotPage onNavigate={navigate} />;

  return <LandingPage onNavigate={navigate} />;
}
