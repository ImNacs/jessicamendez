'use client';

interface LogoJMProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LogoJM({ className = '', size = 'md' }: LogoJMProps) {
  const sizes = {
    sm: { width: 48, height: 56 },
    md: { width: 64, height: 72 },
    lg: { width: 96, height: 108 },
  };

  const { width, height } = sizes[size];

  return (
    <svg
      viewBox="0 0 100 120"
      width={width}
      height={height}
      className={className}
      aria-label="JM Bióloga Logo"
    >
      {/* J - Rosa terracota */}
      <path
        d="M30 15 L30 70 Q30 90 15 95"
        fill="none"
        stroke="#C4958A"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* M - Verde bosque */}
      <path
        d="M45 95 L45 35 L65 65 L85 35 L85 95"
        fill="none"
        stroke="#5B7C5B"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Bióloga text */}
      <text
        x="50"
        y="115"
        textAnchor="middle"
        fill="#C4958A"
        fontSize="12"
        fontFamily="serif"
        fontStyle="italic"
      >
        Bióloga
      </text>
    </svg>
  );
}
