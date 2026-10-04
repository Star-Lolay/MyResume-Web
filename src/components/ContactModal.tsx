import { useLanguage } from "../contexts/LanguageContext";
import { profile } from "../data/resume";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 联系方式弹窗（纯静态）：邮箱 mailto + 社交链接
 * 链接在 src/data/resume.ts 的 profile.socials 中维护
 */
export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { language } = useLanguage();

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(13, 13, 13, 0.55)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        animation: "fadeIn 300ms ease-in-out",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg-warm-white)",
          border: "1px solid var(--border-light)",
          padding: "28px",
          width: "100%",
          maxWidth: "380px",
        }}
      >
        <div className="flex items-center justify-between" style={{ marginBottom: "20px" }}>
          <h2 className="font-label" style={{ fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-grey)" }}>
            {language === "zh" ? "联系我" : "Contact"}
          </h2>
          <button
            onClick={onClose}
            className="font-label"
            style={{ fontSize: "14px", color: "var(--text-charcoal)", background: "none", border: "none", cursor: "pointer", padding: "8px", minWidth: "44px", minHeight: "44px", lineHeight: 1 }}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <p className="font-display" style={{ fontSize: "20px", color: "var(--text-charcoal)", marginBottom: "20px", lineHeight: 1.4 }}>
          {language === "zh" ? "聊聊合作、机会，或只是打个招呼。" : "Collaborations, opportunities, or just say hi."}
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="link-underline"
          style={{ display: "block", fontSize: "14px", color: "var(--accent-teal)", marginBottom: "18px" }}
        >
          {profile.email}
        </a>

        <div className="flex flex-col gap-2">
          {profile.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
              style={{ fontSize: "13px", color: "var(--text-charcoal)", width: "fit-content", padding: "4px 0" }}
            >
              {s.label} ↗
            </a>
          ))}
        </div>
      </div>

      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </div>
  );
}
