// Static stand-in for the 3D crystal (replaced by the R3F scene in M5).
export function CrystalImage({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label="Blue crystal illustration"
      className={className}
    >
      <ellipse
        cx="200"
        cy="215"
        rx="175"
        ry="48"
        fill="none"
        stroke="var(--accent-2)"
        strokeOpacity="0.5"
        strokeDasharray="4 6"
      />
      <path d="M200 30 70 200 200 250Z" fill="#5fa0ff" />
      <path d="M200 30 330 200 200 250Z" fill="#1f5fd6" />
      <path d="M70 200 200 250 200 370Z" fill="#8fd3f4" />
      <path d="M330 200 200 250 200 370Z" fill="#5ba0c4" />
      <g
        fill="none"
        stroke="#0b1d44"
        strokeOpacity="0.6"
        strokeLinejoin="round"
      >
        <path d="M200 30 70 200 200 370 330 200Z" />
        <path d="M70 200 200 250 330 200M200 30V370" />
      </g>
      <path
        d="M50 215c60 40 220 40 300-10"
        fill="none"
        stroke="var(--accent-2)"
        strokeWidth="2"
      />
      <g fill="var(--accent-2)">
        <circle cx="90" cy="80" r="3" />
        <circle cx="330" cy="70" r="3" />
        <circle cx="340" cy="320" r="4" />
        <circle cx="60" cy="300" r="2" />
      </g>
    </svg>
  );
}
