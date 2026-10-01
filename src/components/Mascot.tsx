type MascotVariant = "sky" | "blue" | "deep";

const PALETTE: Record<MascotVariant, { body: string; cup: string; leg: string }> = {
  sky: { body: "#BFE9FF", cup: "#168DD9", leg: "#8FCBE8" },
  blue: { body: "#5FB6E8", cup: "#0E6FA8", leg: "#3E97CC" },
  deep: { body: "#168DD9", cup: "#0A4E78", leg: "#0E6FA8" },
};

/**
 * Unix's little editing assistant.
 * A clean, premium illustrated character — headphones, tiny arms, big heart.
 */
export function Mascot({
  variant = "sky",
  className,
  wave = true,
}: {
  variant?: MascotVariant;
  className?: string;
  wave?: boolean;
}) {
  const c = PALETTE[variant];
  return (
    <svg viewBox="0 0 120 140" className={className} aria-hidden="true">
      {/* legs */}
      <rect x="42" y="116" width="12" height="18" rx="6" fill={c.leg} />
      <rect x="66" y="116" width="12" height="18" rx="6" fill={c.leg} />
      {/* left arm (down) */}
      <rect x="16" y="88" width="26" height="10" rx="5" fill={c.leg} transform="rotate(24 22 92)" />
      {/* body */}
      <rect x="18" y="36" width="84" height="88" rx="40" fill={c.body} />
      {/* headphones */}
      <path d="M28 66 Q60 16 92 66" fill="none" stroke={c.cup} strokeWidth="8" strokeLinecap="round" />
      <rect x="16" y="58" width="16" height="26" rx="8" fill={c.cup} />
      <rect x="88" y="58" width="16" height="26" rx="8" fill={c.cup} />
      {/* face */}
      <circle cx="48" cy="76" r="4.5" fill="#0A1F3D" />
      <circle cx="72" cy="76" r="4.5" fill="#0A1F3D" />
      <circle cx="49.6" cy="74.4" r="1.4" fill="#fff" />
      <circle cx="73.6" cy="74.4" r="1.4" fill="#fff" />
      <path d="M52 88 Q60 95 68 88" fill="none" stroke="#0A1F3D" strokeWidth="3" strokeLinecap="round" />
      <circle cx="38" cy="86" r="3.4" fill="#fff" opacity="0.45" />
      <circle cx="82" cy="86" r="3.4" fill="#fff" opacity="0.45" />
      {/* waving arm */}
      <g className={wave ? "mascot-wave-arm" : undefined}>
        <rect x="92" y="62" width="26" height="10" rx="5" fill={c.leg} transform="rotate(32 96 68)" />
        <circle cx="113" cy="56" r="6.5" fill={c.leg} />
      </g>
    </svg>
  );
}
