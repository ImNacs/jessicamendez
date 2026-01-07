/**
 * Logo - Jessica Méndez
 * Componente unificado para consistencia de marca
 *
 * Diseño minimalista (2 colores):
 * - Hoja: rosa (accent)
 * - Texto: verde (light) / crema (dark) - para legibilidad
 *
 * Variantes:
 * - default: para header (se adapta a light/dark)
 * - on-dark: para footer u otros fondos oscuros fijos
 */

import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  /** 'on-dark' para usar sobre fondos oscuros fijos (footer) */
  variant?: 'default' | 'on-dark';
}

const sizes = {
  sm: {
    icon: 'w-5 h-5',
    text: 'text-lg',
    gap: 'gap-1.5',
  },
  md: {
    icon: 'w-6 h-6 sm:w-7 sm:h-7',
    text: 'text-[1.35rem] sm:text-2xl',
    gap: 'gap-2',
  },
  lg: {
    icon: 'w-8 h-8',
    text: 'text-2xl sm:text-3xl',
    gap: 'gap-2.5',
  },
};

export function Logo({ className, size = 'md', variant = 'default' }: LogoProps) {
  const s = sizes[size];
  const onDark = variant === 'on-dark';

  // Rosa para hoja (siempre)
  const leafColor = onDark
    ? 'text-rosa-400'
    : 'text-rosa-500 dark:text-rosa-400 group-hover:text-rosa-400 dark:group-hover:text-rosa-300';

  // Verde en light, crema en dark (para legibilidad)
  const textColor = onDark
    ? 'text-crema-100'
    : 'text-verde-600 dark:text-crema-100 group-hover:text-verde-500 dark:group-hover:text-white';

  return (
    <div className={cn('flex items-center', s.gap, className)}>
      {/* Hoja - Rosa (accent) */}
      <svg
        className={cn(s.icon, 'transition-colors', leafColor)}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>

      {/* Nombre */}
      <span className={cn('logo-brand-name transition-colors', s.text, textColor)}>
        Jessica
      </span>
      <span className={cn('logo-brand-surname transition-colors', s.text, textColor)}>
        Méndez
      </span>
    </div>
  );
}

export default Logo;
