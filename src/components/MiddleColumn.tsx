import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../contexts/LanguageContext";
import { projects, uiText, profile } from "../data/resume";

gsap.registerPlugin(ScrollTrigger);

/**
 * 中栏：精选项目流（本站主角）
 * 卡片 = 大图封面 + 标题 + 数据指标 + 技术标签，点击进入详情页
 */
export default function MiddleColumn() {
  const columnRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const { language } = useLanguage();

  // 滚动渐入：卡片依次浮现（opacity + translateY，cubic-bezier 缓动）
  useEffect(() => {
    if (!columnRef.current) return;
    const cards = columnRef.current.querySelectorAll(".project-card");
    const triggers: ScrollTrigger[] = [];
    cards.forEach((card, i) => {
      gsap.set(card, { opacity: 0, y: 28 });
      const tween = gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: (i % 3) * 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 92%", toggleActions: "play none none none" },
      });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });
    return () => triggers.forEach((t) => t.kill());
  }, [language]);

  return (
    <main ref={columnRef} className="col-middle">
      <div className="p-6 pb-16" style={{ maxWidth: "720px" }}>
        <div className="flex items-baseline justify-between" style={{ marginBottom: "28px" }}>
          <h2
            className="font-label"
            style={{
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text-grey)",
            }}
          >
            {uiText.projectsTitle[language]}
          </h2>
          <span className="font-label" style={{ fontSize: "11px", color: "var(--text-grey)" }}>
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        {projects.map((project, index) => (
          <article
            key={project.id}
            className="project-card"
            style={{ marginBottom: "40px", paddingBottom: "32px" }}
            onClick={() => navigate(`/project/${project.id}`)}
          >
            {/* 封面图 + 悬停烟熏遮罩 */}
            <div className="card-image mb-4">
              <img src={project.cover} alt={project.title[language]} loading={index === 0 ? "eager" : "lazy"} />
              <div className="smoke">
                <span className="font-label" style={{ fontSize: "11px", letterSpacing: "0.1em", color: "#fff", textTransform: "uppercase" }}>
                  {uiText.viewProject[language]} →
                </span>
              </div>
            </div>

            {/* 标题行 */}
            <div className="flex items-baseline justify-between gap-3 mb-1">
              <h3 className="font-display" style={{ fontSize: "21px", fontWeight: 500, lineHeight: 1.35, color: "var(--text-charcoal)" }}>
                {project.title[language]}
              </h3>
              <span className="font-label" style={{ fontSize: "11px", color: "var(--text-grey)", flexShrink: 0 }}>
                {project.year}
              </span>
            </div>

            <p style={{ fontSize: "13px", color: "var(--text-grey)", lineHeight: 1.65, marginBottom: "14px" }}>
              {project.summary[language]}
            </p>

            {/* 数据指标 */}
            <div className="flex gap-8 mb-4">
              {project.metrics.map((m) => (
                <div key={m.value}>
                  <div className="metric-value">{m.value}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-grey)", marginTop: "2px" }}>{m.label[language]}</div>
                </div>
              ))}
            </div>

            {/* 技术标签 */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}

        {/* 页脚 */}
        <footer style={{ paddingTop: "8px" }}>
          <p className="font-label" style={{ fontSize: "10.5px", color: "var(--text-grey)", lineHeight: 1.8 }}>
            © {new Date().getFullYear()} {profile.name[language]}
            <br />
            {uiText.footer[language]}
          </p>
        </footer>
      </div>
    </main>
  );
}
