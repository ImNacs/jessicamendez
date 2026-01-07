'use client';

interface SVGProps {
  className?: string;
  color?: string;
}

// Hoja simple estilizada
export function LeafSimple({ className = '', color = '#5B7C5B' }: SVGProps) {
  return (
    <svg viewBox="0 0 40 60" className={className} aria-hidden="true">
      <path
        d="M20 5 Q35 20 35 40 Q35 55 20 55 Q5 55 5 40 Q5 20 20 5 Z"
        fill={color}
        fillOpacity="0.9"
      />
      <path
        d="M20 15 L20 50 M20 25 Q12 30 10 35 M20 35 Q28 40 30 45"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}

// Rama con hojas
export function BranchWithLeaves({ className = '', color = '#5B7C5B' }: SVGProps) {
  return (
    <svg viewBox="0 0 80 200" className={className} aria-hidden="true">
      {/* Rama principal */}
      <path
        d="M40 0 L40 200"
        stroke={color}
        strokeWidth="3"
        fill="none"
      />
      {/* Hojas */}
      <g fill={color}>
        <ellipse cx="25" cy="30" rx="12" ry="20" transform="rotate(-30 25 30)" />
        <ellipse cx="55" cy="50" rx="12" ry="20" transform="rotate(30 55 50)" />
        <ellipse cx="25" cy="80" rx="12" ry="20" transform="rotate(-30 25 80)" />
        <ellipse cx="55" cy="110" rx="12" ry="20" transform="rotate(30 55 110)" />
        <ellipse cx="25" cy="140" rx="12" ry="20" transform="rotate(-30 25 140)" />
        <ellipse cx="55" cy="170" rx="12" ry="20" transform="rotate(30 55 170)" />
      </g>
    </svg>
  );
}

// Globo con planta
export function GlobeWithPlant({ className = '', color = '#5B7C5B' }: SVGProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {/* Globo */}
      <circle
        cx="50"
        cy="55"
        r="35"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
      />
      {/* Continentes simplificados */}
      <path
        d="M30 45 Q35 40 45 42 Q55 44 55 55 Q55 65 45 70 Q35 75 30 65 Q25 55 30 45"
        fill={color}
        fillOpacity="0.3"
      />
      <path
        d="M60 40 Q70 45 68 55 Q66 60 60 58"
        fill={color}
        fillOpacity="0.3"
      />
      {/* Planta creciendo */}
      <path
        d="M50 20 L50 35"
        stroke={color}
        strokeWidth="2"
        fill="none"
      />
      <ellipse cx="42" cy="15" rx="8" ry="12" transform="rotate(-30 42 15)" fill={color} />
      <ellipse cx="58" cy="15" rx="8" ry="12" transform="rotate(30 58 15)" fill={color} />
    </svg>
  );
}

// Mano sosteniendo planta
export function HandWithPlant({ className = '', color = '#5B7C5B' }: SVGProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {/* Mano simplificada */}
      <path
        d="M20 70 Q30 60 50 60 Q70 60 80 70 L75 85 Q60 90 50 90 Q40 90 25 85 Z"
        fill={color}
        fillOpacity="0.3"
        stroke={color}
        strokeWidth="2"
      />
      {/* Tallo */}
      <path
        d="M50 60 L50 25"
        stroke={color}
        strokeWidth="2.5"
        fill="none"
      />
      {/* Hojas */}
      <ellipse cx="38" cy="35" rx="10" ry="16" transform="rotate(-40 38 35)" fill={color} />
      <ellipse cx="62" cy="35" rx="10" ry="16" transform="rotate(40 62 35)" fill={color} />
      <ellipse cx="42" cy="20" rx="8" ry="12" transform="rotate(-30 42 20)" fill={color} />
      <ellipse cx="58" cy="20" rx="8" ry="12" transform="rotate(30 58 20)" fill={color} />
    </svg>
  );
}

// Forma orgánica (blob) para fondos
export function OrganicBlob({ className = '', color = '#5B7C5B' }: SVGProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <path
        d="M40 80 Q20 40 60 30 Q100 20 140 40 Q180 60 170 100 Q160 140 120 160 Q80 180 50 150 Q20 120 40 80 Z"
        fill={color}
        fillOpacity="0.1"
      />
    </svg>
  );
}

// Patrón de hojas para fondo
export function LeafPattern({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <pattern id="leafPattern" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
          <ellipse cx="12.5" cy="12.5" rx="5" ry="8" fill="#5B7C5B" fillOpacity="0.05" transform="rotate(45 12.5 12.5)" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#leafPattern)" />
    </svg>
  );
}

// Decorador de sección (línea con hoja)
export function SectionDivider({ className = '', color = '#5B7C5B' }: SVGProps) {
  return (
    <svg viewBox="0 0 200 30" className={className} aria-hidden="true">
      <line x1="0" y1="15" x2="85" y2="15" stroke={color} strokeWidth="1" opacity="0.3" />
      <ellipse cx="100" cy="15" rx="6" ry="10" fill={color} transform="rotate(45 100 15)" />
      <line x1="115" y1="15" x2="200" y2="15" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

// Decorador circular con hojas
export function CircleWithLeaves({ className = '', color = '#5B7C5B' }: SVGProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <circle cx="60" cy="60" r="50" fill="none" stroke={color} strokeWidth="2" opacity="0.3" />
      {/* Hojas alrededor */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <ellipse
          key={i}
          cx="60"
          cy="10"
          rx="4"
          ry="8"
          fill={color}
          fillOpacity="0.6"
          transform={`rotate(${angle} 60 60)`}
        />
      ))}
    </svg>
  );
}
