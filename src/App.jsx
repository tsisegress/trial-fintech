import { useState } from "react";
import DashboardPage from "./pages/DashboardPage";
import DiscoverPage from "./pages/DiscoverPage";
import LandingPage from "./pages/LandingPageFull";
import OnboardingPage from "./pages/Onboardingpage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";

export default function App() {
  const [route, setRoute] = useState("landing");
  const [profile, setProfile] = useState({
    role: "founder",
    name: "",
    fullName: "",
    email: "",
    orgName: "",
    sectors: ["Fintech", "AI/ML"],
  });

  const navigate = (next, payload) => {
    if (payload && typeof payload === "object") {
      setProfile((prev) => ({ ...prev, ...payload }));
    }
    setRoute(next);
  };

  if (route === "landing") return <LandingPage onNavigate={navigate} />;
  if (route === "onboarding") return <OnboardingPage onNavigate={navigate} />;
  if (route === "discover") return <DiscoverPage profile={profile} onNavigate={navigate} />;
  if (route === "profile") return <ProfilePage initialProfile={profile} onNavigate={navigate} />;
  if (route === "search") return <SearchPage onNavigate={navigate} />;
  if (route === "dashboard") return <DashboardPage onNavigate={navigate} />;

  return <LandingPage onNavigate={navigate} />;
}
