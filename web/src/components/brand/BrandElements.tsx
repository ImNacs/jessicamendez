/**
 * Brand Elements - Jessica Mendez Biologa
 * Componentes SVG de identidad grafica
 *
 * Paleta de colores:
 * - Verde Bosque: #5B7C5B
 * - Rosa Terracota: #C4958A
 * - Blanco: #FFFFFF
 * - Gris Oscuro: #333333
 * - Verde Claro: #8BAD8B
 */

import React from 'react';

// ============================================
// TIPOS Y CONSTANTES
// ============================================

export const BrandColors = {
  primary: '#5B7C5B',
  primaryDark: '#4A6B4A',
  primaryLight: '#6B8C6B',
  primary10: '#EFF3EF',
  secondary: '#C4958A',
  secondaryDark: '#B08578',
  secondaryLight: '#D4A59A',
  secondary10: '#FAF5F4',
  secondary50: '#E2CAC5',
  white: '#FFFFFF',
  black: '#333333',
  grayDark: '#666666',
  grayMedium: '#999999',
  grayLight: '#F5F5F5',
  accent: '#8BAD8B',
} as const;

interface SVGProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  color?: string;
  secondaryColor?: string;
}

// ============================================
// LOGO JM BIOLOGA
// ============================================

interface LogoProps extends SVGProps {
  variant?: 'full' | 'monochrome-green' | 'monochrome-white' | 'monochrome-black';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  width = 120,
  height = 100,
  variant = 'full',
}) => {
  let jColor = BrandColors.secondary;
  let mColor = BrandColors.primary;
  let textColor = BrandColors.secondary;

  switch (variant) {
    case 'monochrome-green':
      jColor = mColor = textColor = BrandColors.primary;
      break;
    case 'monochrome-white':
      jColor = mColor = textColor = BrandColors.white;
      break;
    case 'monochrome-black':
      jColor = mColor = textColor = BrandColors.black;
      break;
  }

  return (
    <svg
      viewBox="0 0 120 100"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="JM Biologa Logo"
    >
      {/* Letra J */}
      <path
        d="M35 15 L35 55 Q35 75 20 75 Q10 75 5 68"
        fill="none"
        stroke={jColor}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Letra M */}
      <path
        d="M40 70 L40 20 L60 50 L80 20 L80 70"
        fill="none"
        stroke={mColor}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Texto Biologa */}
      <text
        x="60"
        y="90"
        textAnchor="middle"
        fill={textColor}
        fontSize="12"
        fontFamily="serif"
        fontStyle="italic"
      >
        Biologa
      </text>
    </svg>
  );
};

// ============================================
// HOJA SIMPLE
// ============================================

export const LeafSimple: React.FC<SVGProps> = ({
  className = '',
  width = 40,
  height = 40,
  color = BrandColors.primary,
}) => {
  return (
    <svg
      viewBox="0 0 40 40"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Hoja"
    >
      {/* Hoja */}
      <path
        d="M20 5
           Q35 10 35 25
           Q35 38 20 38
           Q5 38 5 25
           Q5 10 20 5"
        fill={color}
        opacity="0.9"
      />
      {/* Nervadura central */}
      <path
        d="M20 8 L20 35"
        fill="none"
        stroke={BrandColors.white}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Nervaduras laterales */}
      <path
        d="M20 14 Q12 16 10 20
           M20 20 Q12 22 9 27
           M20 26 Q14 28 12 32
           M20 14 Q28 16 30 20
           M20 20 Q28 22 31 27
           M20 26 Q26 28 28 32"
        fill="none"
        stroke={BrandColors.white}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
};

// ============================================
// HOJA OUTLINE (Estilo linea)
// ============================================

export const LeafOutline: React.FC<SVGProps> = ({
  className = '',
  width = 40,
  height = 40,
  color = BrandColors.primary,
}) => {
  return (
    <svg
      viewBox="0 0 40 40"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Hoja outline"
    >
      <path
        d="M20 5
           Q35 10 35 25
           Q35 38 20 38
           Q5 38 5 25
           Q5 10 20 5"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Nervadura central */}
      <path
        d="M20 8 L20 35"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Nervaduras laterales */}
      <path
        d="M20 15 L12 20
           M20 22 L10 28
           M20 15 L28 20
           M20 22 L30 28"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

// ============================================
// RAMA CON HOJAS
// ============================================

export const BranchWithLeaves: React.FC<SVGProps> = ({
  className = '',
  width = 60,
  height = 200,
  color = BrandColors.primary,
}) => {
  return (
    <svg
      viewBox="0 0 60 200"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Rama con hojas"
    >
      {/* Tallo principal */}
      <path
        d="M30 10
           Q32 50 28 80
           Q24 110 30 140
           Q36 170 30 195"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Hoja 1 - Arriba izquierda */}
      <g transform="translate(5, 20) rotate(-30)">
        <path
          d="M0 0 Q15 -8 25 0 Q15 8 0 0"
          fill={color}
        />
        <path
          d="M2 0 L22 0"
          stroke={BrandColors.white}
          strokeWidth="0.8"
          opacity="0.5"
        />
      </g>

      {/* Hoja 2 - Arriba derecha */}
      <g transform="translate(35, 35) rotate(30)">
        <path
          d="M0 0 Q15 -8 25 0 Q15 8 0 0"
          fill={color}
        />
        <path
          d="M2 0 L22 0"
          stroke={BrandColors.white}
          strokeWidth="0.8"
          opacity="0.5"
        />
      </g>

      {/* Hoja 3 - Izquierda */}
      <g transform="translate(8, 60) rotate(-40)">
        <path
          d="M0 0 Q15 -8 25 0 Q15 8 0 0"
          fill={color}
        />
        <path
          d="M2 0 L22 0"
          stroke={BrandColors.white}
          strokeWidth="0.8"
          opacity="0.5"
        />
      </g>

      {/* Hoja 4 - Derecha */}
      <g transform="translate(32, 85) rotate(35)">
        <path
          d="M0 0 Q15 -8 25 0 Q15 8 0 0"
          fill={color}
        />
        <path
          d="M2 0 L22 0"
          stroke={BrandColors.white}
          strokeWidth="0.8"
          opacity="0.5"
        />
      </g>

      {/* Hoja 5 - Izquierda */}
      <g transform="translate(5, 110) rotate(-35)">
        <path
          d="M0 0 Q15 -8 25 0 Q15 8 0 0"
          fill={color}
        />
        <path
          d="M2 0 L22 0"
          stroke={BrandColors.white}
          strokeWidth="0.8"
          opacity="0.5"
        />
      </g>

      {/* Hoja 6 - Derecha */}
      <g transform="translate(35, 135) rotate(40)">
        <path
          d="M0 0 Q15 -8 25 0 Q15 8 0 0"
          fill={color}
        />
        <path
          d="M2 0 L22 0"
          stroke={BrandColors.white}
          strokeWidth="0.8"
          opacity="0.5"
        />
      </g>

      {/* Hoja 7 - Izquierda abajo */}
      <g transform="translate(10, 155) rotate(-30)">
        <path
          d="M0 0 Q15 -8 25 0 Q15 8 0 0"
          fill={color}
        />
        <path
          d="M2 0 L22 0"
          stroke={BrandColors.white}
          strokeWidth="0.8"
          opacity="0.5"
        />
      </g>

      {/* Hoja 8 - Derecha abajo */}
      <g transform="translate(32, 175) rotate(30)">
        <path
          d="M0 0 Q15 -8 25 0 Q15 8 0 0"
          fill={color}
        />
        <path
          d="M2 0 L22 0"
          stroke={BrandColors.white}
          strokeWidth="0.8"
          opacity="0.5"
        />
      </g>
    </svg>
  );
};

// ============================================
// GLOBO CON PLANTA
// ============================================

export const GlobeWithPlant: React.FC<SVGProps> = ({
  className = '',
  width = 120,
  height = 120,
  color = BrandColors.primary,
}) => {
  return (
    <svg
      viewBox="0 0 120 120"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Globo con planta"
    >
      {/* Circulo del globo */}
      <circle
        cx="60"
        cy="65"
        r="45"
        fill="none"
        stroke={color}
        strokeWidth="3"
      />

      {/* Linea del ecuador */}
      <ellipse
        cx="60"
        cy="65"
        rx="45"
        ry="15"
        fill="none"
        stroke={color}
        strokeWidth="2"
        opacity="0.6"
      />

      {/* Meridiano vertical */}
      <ellipse
        cx="60"
        cy="65"
        rx="15"
        ry="45"
        fill="none"
        stroke={color}
        strokeWidth="2"
        opacity="0.6"
      />

      {/* Continente estilizado - Americas */}
      <path
        d="M45 35
           Q40 40 42 50
           Q44 55 40 60
           Q35 70 40 80
           Q45 90 50 95
           M55 30
           Q60 35 58 45
           Q55 55 60 65
           Q65 75 60 85
           Q55 95 60 100"
        fill="none"
        stroke={color}
        strokeWidth="2"
        opacity="0.4"
      />

      {/* Tallo de la planta que sale del globo */}
      <path
        d="M60 20 Q55 12 60 5 Q65 12 60 20"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Hojas superiores */}
      <g transform="translate(60, 5)">
        {/* Hoja izquierda */}
        <path
          d="M-5 0 Q-20 -10 -25 -5 Q-20 5 -5 0"
          fill={color}
        />
        {/* Hoja derecha */}
        <path
          d="M5 0 Q20 -10 25 -5 Q20 5 5 0"
          fill={color}
        />
        {/* Hoja central */}
        <path
          d="M0 -5 Q-8 -20 0 -25 Q8 -20 0 -5"
          fill={color}
        />
      </g>

      {/* Rama lateral izquierda con hojas */}
      <g transform="translate(15, 45)">
        <path
          d="M45 20 Q30 15 20 20"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M25 15 Q10 5 5 12 Q15 20 25 15"
          fill={color}
        />
        <path
          d="M35 18 Q22 8 18 15 Q27 22 35 18"
          fill={color}
        />
      </g>

      {/* Rama lateral derecha con hojas */}
      <g transform="translate(60, 40)">
        <path
          d="M0 25 Q15 18 25 22"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M20 17 Q35 7 40 14 Q30 22 20 17"
          fill={color}
        />
        <path
          d="M10 20 Q23 10 27 17 Q18 24 10 20"
          fill={color}
        />
      </g>
    </svg>
  );
};

// ============================================
// MANO SOSTENIENDO PLANTA
// ============================================

export const HandWithPlant: React.FC<SVGProps> = ({
  className = '',
  width = 100,
  height = 100,
  color = BrandColors.primary,
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Mano sosteniendo planta"
    >
      {/* Mano - palma */}
      <path
        d="M20 75
           Q15 70 18 60
           L30 55
           Q35 50 45 50
           L70 50
           Q85 50 85 65
           Q85 80 70 85
           L30 85
           Q20 85 20 75"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Pulgar */}
      <path
        d="M30 55 Q20 45 25 40 Q35 38 40 48"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Dedos sugeridos */}
      <path
        d="M45 50 L45 42 Q45 38 50 38 Q55 38 55 42 L55 50"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M58 50 L58 40 Q58 36 63 36 Q68 36 68 40 L68 50"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Tallo de la planta */}
      <path
        d="M50 50
           Q50 40 50 30
           Q50 20 50 15"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Hojas de la planta */}
      {/* Hoja izquierda inferior */}
      <path
        d="M50 35 Q35 30 32 35 Q38 42 50 35"
        fill={color}
      />
      {/* Hoja derecha inferior */}
      <path
        d="M50 35 Q65 30 68 35 Q62 42 50 35"
        fill={color}
      />
      {/* Hoja izquierda superior */}
      <path
        d="M50 22 Q38 15 35 20 Q40 28 50 22"
        fill={color}
      />
      {/* Hoja derecha superior */}
      <path
        d="M50 22 Q62 15 65 20 Q60 28 50 22"
        fill={color}
      />
      {/* Hoja central */}
      <path
        d="M50 15 Q42 5 50 0 Q58 5 50 15"
        fill={color}
      />
    </svg>
  );
};

// ============================================
// FORMA ORGANICA / BLOB 1
// ============================================

export const OrganicBlob1: React.FC<SVGProps> = ({
  className = '',
  width = 200,
  height = 200,
  color = BrandColors.secondary,
}) => {
  return (
    <svg
      viewBox="0 0 200 200"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Forma organica"
    >
      <path
        d="M100 20
           Q160 20 170 60
           Q180 100 160 140
           Q140 180 100 180
           Q60 180 40 150
           Q20 120 30 80
           Q40 40 100 20"
        fill={color}
        opacity="0.3"
      />
    </svg>
  );
};

// ============================================
// FORMA ORGANICA / BLOB 2
// ============================================

export const OrganicBlob2: React.FC<SVGProps> = ({
  className = '',
  width = 200,
  height = 200,
  color = BrandColors.primary,
}) => {
  return (
    <svg
      viewBox="0 0 200 200"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Forma organica 2"
    >
      <path
        d="M80 15
           Q140 10 165 50
           Q190 90 175 130
           Q160 170 110 185
           Q60 200 30 160
           Q0 120 20 70
           Q40 20 80 15"
        fill={color}
        opacity="0.15"
      />
    </svg>
  );
};

// ============================================
// FORMA ORGANICA / BLOB 3 (Mas fluida)
// ============================================

export const OrganicBlob3: React.FC<SVGProps> = ({
  className = '',
  width = 200,
  height = 200,
  color = BrandColors.secondary10,
}) => {
  return (
    <svg
      viewBox="0 0 200 200"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Forma organica 3"
    >
      <path
        d="M90 10
           C130 5 170 30 180 70
           C190 110 170 150 140 175
           C110 200 60 195 35 160
           C10 125 5 80 30 45
           C55 10 90 10 90 10"
        fill={color}
      />
    </svg>
  );
};

// ============================================
// PATRON DE HOJAS (Para fondos)
// ============================================

export const LeafPattern: React.FC<SVGProps> = ({
  className = '',
  width = 400,
  height = 400,
  color = BrandColors.primary,
}) => {
  return (
    <svg
      viewBox="0 0 400 400"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Patron de hojas"
    >
      <defs>
        <pattern
          id="leafPattern"
          x="0"
          y="0"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          {/* Hoja 1 */}
          <g transform="translate(20, 20) rotate(15)">
            <path
              d="M0 0 Q10 -5 15 0 Q10 5 0 0"
              fill={color}
              opacity="0.08"
            />
          </g>
          {/* Hoja 2 */}
          <g transform="translate(70, 30) rotate(-25)">
            <path
              d="M0 0 Q12 -6 18 0 Q12 6 0 0"
              fill={color}
              opacity="0.06"
            />
          </g>
          {/* Hoja 3 */}
          <g transform="translate(40, 70) rotate(45)">
            <path
              d="M0 0 Q8 -4 12 0 Q8 4 0 0"
              fill={color}
              opacity="0.07"
            />
          </g>
          {/* Hoja 4 */}
          <g transform="translate(80, 80) rotate(-10)">
            <path
              d="M0 0 Q10 -5 15 0 Q10 5 0 0"
              fill={color}
              opacity="0.05"
            />
          </g>
          {/* Hoja 5 */}
          <g transform="translate(10, 60) rotate(30)">
            <path
              d="M0 0 Q8 -4 12 0 Q8 4 0 0"
              fill={color}
              opacity="0.06"
            />
          </g>
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#leafPattern)" />
    </svg>
  );
};

// ============================================
// ICONO DE SOSTENIBILIDAD (Reciclaje con hoja)
// ============================================

export const SustainabilityIcon: React.FC<SVGProps> = ({
  className = '',
  width = 50,
  height = 50,
  color = BrandColors.primary,
}) => {
  return (
    <svg
      viewBox="0 0 50 50"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Icono de sostenibilidad"
    >
      {/* Circulo exterior */}
      <circle
        cx="25"
        cy="25"
        r="22"
        fill="none"
        stroke={color}
        strokeWidth="2"
      />

      {/* Flechas de reciclaje simplificadas */}
      <path
        d="M25 12 L30 18 L25 24 M25 18 L15 18"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35 25 L35 35 L25 35"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 35 L15 25 L25 25"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Hoja central */}
      <path
        d="M25 20 Q20 25 22 30 Q25 35 28 30 Q30 25 25 20"
        fill={color}
        opacity="0.8"
      />
    </svg>
  );
};

// ============================================
// ICONO ESG
// ============================================

export const ESGIcon: React.FC<SVGProps> = ({
  className = '',
  width = 60,
  height = 60,
  color = BrandColors.primary,
  secondaryColor = BrandColors.secondary,
}) => {
  return (
    <svg
      viewBox="0 0 60 60"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Icono ESG"
    >
      {/* E - Environment */}
      <circle cx="15" cy="15" r="12" fill={color} opacity="0.2" />
      <text x="15" y="19" textAnchor="middle" fill={color} fontSize="12" fontWeight="bold">E</text>

      {/* S - Social */}
      <circle cx="45" cy="15" r="12" fill={secondaryColor} opacity="0.2" />
      <text x="45" y="19" textAnchor="middle" fill={secondaryColor} fontSize="12" fontWeight="bold">S</text>

      {/* G - Governance */}
      <circle cx="30" cy="42" r="12" fill={color} opacity="0.2" />
      <text x="30" y="46" textAnchor="middle" fill={color} fontSize="12" fontWeight="bold">G</text>

      {/* Lineas conectoras */}
      <path
        d="M23 20 L37 20 M18 23 L25 37 M42 23 L35 37"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray="3,2"
        opacity="0.5"
      />
    </svg>
  );
};

// ============================================
// DIVISOR DECORATIVO
// ============================================

export const DecorativeDivider: React.FC<SVGProps> = ({
  className = '',
  width = 200,
  height = 30,
  color = BrandColors.primary,
}) => {
  return (
    <svg
      viewBox="0 0 200 30"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Divisor decorativo"
    >
      {/* Linea izquierda */}
      <line
        x1="10"
        y1="15"
        x2="80"
        y2="15"
        stroke={color}
        strokeWidth="1"
        opacity="0.5"
      />

      {/* Hoja central */}
      <g transform="translate(100, 15)">
        <path
          d="M-15 0 Q0 -10 15 0 Q0 10 -15 0"
          fill={color}
          opacity="0.8"
        />
        <line
          x1="-12"
          y1="0"
          x2="12"
          y2="0"
          stroke={BrandColors.white}
          strokeWidth="0.5"
          opacity="0.5"
        />
      </g>

      {/* Linea derecha */}
      <line
        x1="120"
        y1="15"
        x2="190"
        y2="15"
        stroke={color}
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  );
};

// ============================================
// ICONO DE DOCUMENTO/REPORTE
// ============================================

export const DocumentIcon: React.FC<SVGProps> = ({
  className = '',
  width = 40,
  height = 40,
  color = BrandColors.primary,
}) => {
  return (
    <svg
      viewBox="0 0 40 40"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Icono de documento"
    >
      {/* Documento base */}
      <path
        d="M8 5 L25 5 L32 12 L32 35 L8 35 Z"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Esquina doblada */}
      <path
        d="M25 5 L25 12 L32 12"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Lineas de texto */}
      <line x1="12" y1="18" x2="28" y2="18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="23" x2="28" y2="23" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="28" x2="22" y2="28" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

// ============================================
// ICONO DE LUPA/BUSQUEDA
// ============================================

export const SearchIcon: React.FC<SVGProps> = ({
  className = '',
  width = 40,
  height = 40,
  color = BrandColors.primary,
}) => {
  return (
    <svg
      viewBox="0 0 40 40"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Icono de busqueda"
    >
      <circle
        cx="17"
        cy="17"
        r="10"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
      />
      <line
        x1="25"
        y1="25"
        x2="35"
        y2="35"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

// ============================================
// ICONO DE GRAFICA/ESTADISTICAS
// ============================================

export const ChartIcon: React.FC<SVGProps> = ({
  className = '',
  width = 40,
  height = 40,
  color = BrandColors.primary,
}) => {
  return (
    <svg
      viewBox="0 0 40 40"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Icono de grafica"
    >
      {/* Marco */}
      <rect
        x="5"
        y="5"
        width="30"
        height="30"
        rx="3"
        fill="none"
        stroke={color}
        strokeWidth="2"
      />

      {/* Barras */}
      <rect x="10" y="22" width="5" height="10" fill={color} opacity="0.6" />
      <rect x="17.5" y="15" width="5" height="17" fill={color} opacity="0.8" />
      <rect x="25" y="18" width="5" height="14" fill={color} />
    </svg>
  );
};

// ============================================
// FOCO/BOMBILLA CON PLANTA
// ============================================

export const LightbulbPlant: React.FC<SVGProps> = ({
  className = '',
  width = 50,
  height = 50,
  color = BrandColors.primary,
}) => {
  return (
    <svg
      viewBox="0 0 50 50"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Foco con planta"
    >
      {/* Bombilla */}
      <path
        d="M25 5
           Q40 5 40 22
           Q40 32 32 36
           L32 42
           L18 42
           L18 36
           Q10 32 10 22
           Q10 5 25 5"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Base de la bombilla */}
      <line x1="18" y1="45" x2="32" y2="45" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="48" x2="30" y2="48" stroke={color} strokeWidth="2" strokeLinecap="round" />

      {/* Planta dentro */}
      <path
        d="M25 35 L25 22"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Hojas */}
      <path
        d="M25 28 Q18 25 17 28 Q20 32 25 28"
        fill={color}
      />
      <path
        d="M25 28 Q32 25 33 28 Q30 32 25 28"
        fill={color}
      />
      <path
        d="M25 22 Q20 17 19 20 Q22 24 25 22"
        fill={color}
      />
      <path
        d="M25 22 Q30 17 31 20 Q28 24 25 22"
        fill={color}
      />
    </svg>
  );
};

// ============================================
// EXPORT DEFAULT - Todos los componentes
// ============================================

const BrandElements = {
  Logo,
  LeafSimple,
  LeafOutline,
  BranchWithLeaves,
  GlobeWithPlant,
  HandWithPlant,
  OrganicBlob1,
  OrganicBlob2,
  OrganicBlob3,
  LeafPattern,
  SustainabilityIcon,
  ESGIcon,
  DecorativeDivider,
  DocumentIcon,
  SearchIcon,
  ChartIcon,
  LightbulbPlant,
  BrandColors,
};

export default BrandElements;
