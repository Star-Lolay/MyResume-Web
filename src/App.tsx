import { useState } from "react";
import { Routes, Route } from "react-router";
import LeftColumn from "./components/LeftColumn";
import MiddleColumn from "./components/MiddleColumn";
import RightColumn from "./components/RightColumn";
import ProjectDetail from "./components/ProjectDetail";
import ContactModal from "./components/ContactModal";
import NotFound from "./pages/NotFound";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import { profile } from "./data/resume";

/** 顶部 40px 工具条：站名 + 主题/语言切换 */
function ToggleBar({ onContactClick }: { onContactClick: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  const btnStyle: React.CSSProperties = {
    fontSize: "11px",
    fontFamily: "'Space Mono', monospace",
    color: "var(--text-charcoal)",
    background: "none",
    border: "none",
    cursor: "pointer",
    letterSpacing: "0.08em",
    padding: "8px 4px", // 触屏可点区域 >= 44px（行内元素配合 min-height）
    minHeight: "44px",
    lineHeight: 1,
    transition: "color 167ms linear",
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onContactClick}
        style={btnStyle}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-teal)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-charcoal)")}
      >
        {language === "zh" ? "联系" : "CONTACT"}
      </button>
      <button
        onClick={toggleLanguage}
        style={btnStyle}
        title="切换语言 / Switch language"
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-teal)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-charcoal)")}
      >
        {language === "zh" ? "EN" : "中"}
      </button>
      <button
        onClick={toggleTheme}
        style={btnStyle}
        title={theme === "light" ? "Dark mode" : "Light mode"}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-teal)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-charcoal)")}
      >
        {theme === "light" ? "DARK" : "LIGHT"}
      </button>
    </div>
  );
}

function Shell() {
  const [contactOpen, setContactOpen] = useState(false);
  const { language } = useLanguage();

  return (
    <div className="app-shell">
      <header className="top-bar">
        <span
          className="font-label"
          style={{ fontSize: "12px", letterSpacing: "0.08em", color: "var(--text-charcoal)" }}
        >
          {profile.name[language]} <span style={{ color: "var(--text-grey)" }}>/ {profile.name.en.toUpperCase()}</span>
        </span>
        <ToggleBar onContactClick={() => setContactOpen(true)} />
      </header>

      <div className="columns">
        <LeftColumn onContactClick={() => setContactOpen(true)} />
        <MiddleColumn />
        <RightColumn />
      </div>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<Shell />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LanguageProvider>
    </ThemeProvider>
  );
}
