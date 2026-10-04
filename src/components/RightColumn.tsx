import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../contexts/LanguageContext";
import { cvEntries, cvCategoryOrder, cvCategoryLabel, skills, uiText } from "../data/resume";

gsap.registerPlugin(ScrollTrigger);

// 右栏顶部的视差装饰图（可换成自己的图）
const RAIL_IMAGE =
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80&auto=format&fit=crop";

/**
 * 右栏：简历轨（按分类分组的经历）+ 技能标签
 * 数据来自 src/data/resume.ts 的 cvEntries / skills
 */
export default function RightColumn() {
  const { language } = useLanguage();
  const artFrameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // 顶部装饰图视差滚动
  useEffect(() => {
    if (!artFrameRef.current || !imageRef.current) return;
    const tween = gsap.to(imageRef.current, {
      y: -32,
      ease: "none",
      scrollTrigger: { trigger: artFrameRef.current, start: "top bottom", end: "bottom top", scrub: true },
    });
    return () => {
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      tween.kill();
    };
  }, []);

  // 按分类分组，顺序由 cvCategoryOrder 决定
  const grouped = cvEntries.reduce<Record<string, typeof cvEntries>>((acc, entry) => {
    (acc[entry.category] ??= []).push(entry);
    return acc;
  }, {});
  const categories = [
    ...cvCategoryOrder.filter((c) => grouped[c]),
    ...Object.keys(grouped).filter((c) => !cvCategoryOrder.includes(c)),
  ];

  return (
    <aside className="col-right">
      {/* 视差装饰图 */}
      <div ref={artFrameRef} style={{ overflow: "hidden", height: "120px", borderBottom: "1px solid var(--border-light)" }}>
        <img
          ref={imageRef}
          src={RAIL_IMAGE}
          alt=""
          loading="lazy"
          style={{ width: "100%", height: "160px", objectFit: "cover", display: "block" }}
        />
      </div>

      <div className="p-6 pb-16">
        {categories.map((category) => (
          <section key={category} style={{ marginBottom: "32px" }}>
            <h2
              className="font-label"
              style={{
                fontSize: "11px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--text-grey)",
                marginBottom: "14px",
              }}
            >
              {(cvCategoryLabel[category]?.[language] ?? category)}
            </h2>
            {grouped[category].map((entry, i) => (
              <div key={i} style={{ marginBottom: "14px" }}>
                <div className="flex items-baseline justify-between gap-2">
                  <p style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-charcoal)", lineHeight: 1.5 }}>
                    {entry.title[language]}
                  </p>
                  <span className="font-label" style={{ fontSize: "10.5px", color: "var(--text-grey)", flexShrink: 0 }}>
                    {entry.year}
                  </span>
                </div>
                {entry.subtitle && (
                  <p style={{ fontSize: "12px", color: "var(--text-grey)", lineHeight: 1.5 }}>{entry.subtitle[language]}</p>
                )}
              </div>
            ))}
          </section>
        ))}

        {/* 技能栈 */}
        <section>
          <h2
            className="font-label"
            style={{
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text-grey)",
              marginBottom: "14px",
            }}
          >
            {uiText.skillsTitle[language]}
          </h2>
          {skills.map((group) => (
            <div key={group.group.en} style={{ marginBottom: "14px" }}>
              <p style={{ fontSize: "12px", color: "var(--text-charcoal)", fontWeight: 500, marginBottom: "6px" }}>
                {group.group[language]}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span key={item} className="tag-pill">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </aside>
  );
}
