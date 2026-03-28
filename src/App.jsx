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

  let currentPage = <LandingPage onNavigate={navigate} />;

  if (route === "landing") currentPage = <LandingPage onNavigate={navigate} />;
  if (route === "onboarding") currentPage = <OnboardingPage onNavigate={navigate} />;
  if (route === "discover") currentPage = <DiscoverPage profile={profile} onNavigate={navigate} />;
  if (route === "profile") currentPage = <ProfilePage initialProfile={profile} onNavigate={navigate} />;
  if (route === "search") currentPage = <SearchPage onNavigate={navigate} />;
  if (route === "dashboard") currentPage = <DashboardPage onNavigate={navigate} />;
  if (route === "chatbot") currentPage = <ChatBotPage onNavigate={navigate} />;

  return (
    <>
      {currentPage}
      {route !== "chatbot" ? (
        <button
          type="button"
          onClick={() => navigate("chatbot")}
          style={{
            position: "fixed",
            right: "24px",
            bottom: "24px",
            zIndex: 1000,
            border: "1px solid rgba(234, 206, 169, 0.6)",
            borderRadius: "9999px",
            background: "linear-gradient(135deg, #85441E 0%, #D39758 100%)",
            color: "#EACEA9",
            boxShadow: "0 10px 24px rgba(21, 13, 11, 0.35)",
            padding: "12px 18px",
            fontWeight: 700,
            fontSize: "14px",
            cursor: "pointer",
          }}
          aria-label="Open chatbot"
          title="Chat with Fintech AI"
        >
          💬 Chat with AI
        </button>
      ) : null}
    </>
  );
}
