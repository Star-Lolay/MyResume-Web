import { useParams, useNavigate } from "react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLanguage } from "../contexts/LanguageContext";
import { projects, uiText } from "../data/resume";

/**
 * 项目详情页：/project/:id
 * 大封面 + 元信息（年份/角色/技术栈）+ 指标带 + 正文 + 「我做了什么」+ 链接 + 上/下项目导航
 */
export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  const index = projects.findIndex((p) => p.id === id);
  const project = index >= 0 ? projects[index] : undefined;
  const prev = index > 0 ? projects[index - 1] : undefined;
  const next = index >= 0 && index < projects.length - 1 ? projects[index + 1] : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (contentRef.current && project) {
      gsap.fromTo(contentRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" });
    }
  }, [id, project]);

  if (!project) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: "100vh", backgroundColor: "var(--bg-warm-white)" }}>
        <div className="text-center">
          <p style={{ fontSize: "14px", color: "var(--text-grey)" }}>{uiText.notFound[language]}</p>
          <button
            onClick={() => navigate("/")}
            className="link-underline"
            style={{ marginTop: "16px", fontSize: "12px", color: "var(--text-charcoal)", background: "none", border: "none", cursor: "pointer" }}
          >
            ← {uiText.backHome[language]}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-warm-white)" }}>
      <div ref={contentRef} style={{ maxWidth: "860px", margin: "0 auto", padding: "24px 20px 64px" }}>
        {/* 返回 */}
        <button
          onClick={() => navigate("/")}
          className="font-label link-underline"
          style={{
            fontSize: "12px",
            letterSpacing: "0.06em",
            color: "var(--text-charcoal)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "12px 0",
            minHeight: "44px",
            marginBottom: "20px",
          }}
        >
          ← {uiText.backHome[language]}
        </button>

        {/* 封面 */}
        <div className="card-image" style={{ marginBottom: "28px" }}>
          <img src={project.cover} alt={project.title[language]} />
        </div>

        {/* 标题 + 年份 */}
        <div className="flex items-baseline justify-between gap-4 flex-wrap" style={{ marginBottom: "6px" }}>
          <h1 className="font-display" style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 500, lineHeight: 1.25, color: "var(--text-charcoal)" }}>
            {project.title[language]}
          </h1>
          <span className="font-label" style={{ fontSize: "12px", color: "var(--text-grey)" }}>{project.year}</span>
        </div>
        <p style={{ fontSize: "15px", color: "var(--text-grey)", lineHeight: 1.7, marginBottom: "24px" }}>
          {project.subtitle[language]}
        </p>

        {/* 元信息行 */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            borderTop: "1px solid var(--border-light)",
            borderBottom: "1px solid var(--border-light)",
            padding: "16px 0",
            marginBottom: "24px",
          }}
        >
          <div>
            <p className="font-label" style={metaLabel}>{language === "zh" ? "角色" : "ROLE"}</p>
            <p style={metaValue}>{project.role[language]}</p>
          </div>
          <div>
            <p className="font-label" style={metaLabel}>{uiText.stackTitle[language]}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <span key={t} className="tag-pill">{t}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="font-label" style={metaLabel}>{uiText.linksTitle[language]}</p>
            <div className="flex flex-col gap-1">
              {project.links.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                  style={{ fontSize: "12.5px", color: "var(--accent-teal)", width: "fit-content" }}
                >
                  {l.label[language]} ↗
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 指标带 */}
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", marginBottom: "32px" }}
        >
          {project.metrics.map((m) => (
            <div key={m.value}>
              <div className="metric-value" style={{ fontSize: "30px" }}>{m.value}</div>
              <div style={{ fontSize: "12px", color: "var(--text-grey)", marginTop: "4px" }}>{m.label[language]}</div>
            </div>
          ))}
        </div>

        {/* 正文 */}
        {project.detail[language].map((para, i) => (
          <p key={i} style={{ fontSize: "14.5px", lineHeight: 1.95, color: "var(--text-charcoal)", marginBottom: "18px", textAlign: "justify" }}>
            {para}
          </p>
        ))}

        {/* 我做了什么 */}
        <h2
          className="font-label"
          style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-grey)", margin: "32px 0 14px" }}
        >
          {uiText.highlightsTitle[language]}
        </h2>
        <ul style={{ marginBottom: "40px", paddingLeft: "18px" }}>
          {project.highlights[language].map((h, i) => (
            <li key={i} style={{ fontSize: "13.5px", lineHeight: 1.9, color: "var(--text-charcoal)" }}>
              {h}
            </li>
          ))}
        </ul>

        {/* 上/下项目 */}
        <nav
          className="flex justify-between gap-4"
          style={{ borderTop: "1px solid var(--border-light)", paddingTop: "20px" }}
        >
          {prev ? (
            <button onClick={() => navigate(`/project/${prev.id}`)} style={navBtn} className="font-label">
              ← {uiText.prevProject[language]}
              <span style={navTitle}>{prev.title[language]}</span>
            </button>
          ) : (
            <span />
          )}
          {next ? (
            <button onClick={() => navigate(`/project/${next.id}`)} style={{ ...navBtn, textAlign: "right" }} className="font-label">
              {uiText.nextProject[language]} →
              <span style={navTitle}>{next.title[language]}</span>
            </button>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </div>
  );
}

const metaLabel: React.CSSProperties = {
  fontSize: "10.5px",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--text-grey)",
  marginBottom: "6px",
};

const metaValue: React.CSSProperties = { fontSize: "13px", color: "var(--text-charcoal)", lineHeight: 1.6 };

const navBtn: React.CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "11px",
  letterSpacing: "0.06em",
  color: "var(--text-grey)",
  padding: "12px 0",
  minHeight: "44px",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
};

const navTitle: React.CSSProperties = { fontSize: "13px", color: "var(--accent-teal)", letterSpacing: 0 };
