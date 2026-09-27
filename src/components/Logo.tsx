interface LogoMarkProps {
  size?: number;
}

// Thought cloud with a spark: curiosity, and the "aha" at the end. Kept in sync with public/favicon.svg.
export default function LogoMark({ size = 28 }: LogoMarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <g fill="var(--gold)">
        <circle cx="11" cy="16" r="5.5" />
        <circle cx="17.5" cy="11.5" r="7" />
        <circle cx="24" cy="16" r="5.5" />
        <rect x="11" y="14" width="13" height="7.5" />
        <circle cx="8.3" cy="25.3" r="2.3" />
        <circle cx="4.8" cy="28.8" r="1.5" />
      </g>
      <path
        d="M17.5 9.8c.5 3 1.5 4 4.5 4.5-3 .5-4 1.5-4.5 4.5-.5-3-1.5-4-4.5-4.5 3-.5 4-1.5 4.5-4.5Z"
        fill="var(--stage-black)"
      />
    </svg>
  );
}
