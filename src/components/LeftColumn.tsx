import { lazy, Suspense } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { profile, uiText } from "../data/resume";

// three.js 体积较大，懒加载动态背景，不阻塞首屏内容渲染
const ShaderCanvas = lazy(() => import("./ShaderCanvas"));

interface LeftColumnProps {
  onContactClick: () => void;
}

/**
 * 左栏：Shader 动态背景 + 头像 / 简介 / 联系方式
 * 所有文案来自 src/data/resume.ts 的 profile
 */
export default function LeftColumn({ onContactClick }: LeftColumnProps) {
  const { language } = useLanguage();

  return (
    <aside className="col-left">
      <Suspense fallback={<div style={{ position: "absolute", inset: 0, background: "#0D0D0D" }} />}>
        <ShaderCanvas />
      </Suspense>

      {/* 头像不参与 difference 混合，避免反色 */}
      <div className="relative z-10 p-6 pb-0">
        <img
          src={profile.avatar}
          alt={profile.name[language]}
          loading="lazy"
          style={{
            width: "84px",
            height: "84px",
            objectFit: "cover",
            border: "1px solid rgba(255,255,255,0.5)",
            filter: "grayscale(15%)",
          }}
        />
      </div>

      <div
        className="relative z-10 flex flex-col p-6"
        style={{ mixBlendMode: "difference", color: "#FFFFFF", height: "calc(100% - 108px)" }}
      >
        {/* 姓名与头衔 */}
        <div className="mb-6">
          <p
            className="font-label"
            style={{
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.65)",
              marginBottom: "6px",
            }}
          >
            {uiText.profileTitle[language]}
          </p>
          <p style={{ fontSize: "13px", lineHeight: 1.5, fontWeight: 500 }}>{profile.headline[language]}</p>
          <p className="font-label" style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", marginTop: "4px" }}>
            {profile.location[language]}
          </p>
        </div>

        {/* 简介 */}
        <div style={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
          <p style={{ fontSize: "12.5px", lineHeight: 1.9, maxWidth: "260px", textAlign: "justify" }}>
            {profile.bio[language]}
          </p>
        </div>

        {/* 底部：求职状态 + 联系按钮 */}
        <div className="mt-auto" style={{ flexShrink: 0, paddingTop: "16px" }}>
          {profile.status && (
            <p className="font-label" style={{ fontSize: "11px", color: "rgba(255,255,255,0.85)", marginBottom: "10px" }}>
              {profile.status[language]}
            </p>
          )}
          <button
            onClick={onContactClick}
            className="font-label"
            style={{
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px 0",
              minHeight: "44px",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              transition: "opacity 167ms linear",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {uiText.contactTitle[language]} →
          </button>
        </div>
      </div>
    </aside>
  );
}
