/**
 * Blog Utilities
 * Helper functions for blog functionality
 */

/**
 * Calculate reading time for content
 * @param content - The content string to calculate reading time for
 * @returns Reading time in minutes
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200; // Average reading speed in Spanish
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Format date in Spanish locale
 * @param date - Date to format
 * @returns Formatted date string
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format date in short format
 * @param date - Date to format
 * @returns Short formatted date string
 */
export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Category display names and colors
 */
export const categoryConfig: Record<string, {
  name: string;
  bgLight: string;
  bgDark: string;
  textLight: string;
  textDark: string;
}> = {
  'ESG': {
    name: 'ESG',
    bgLight: 'bg-verde-100',
    bgDark: 'dark:bg-verde-900/50',
    textLight: 'text-verde-700',
    textDark: 'dark:text-verde-300',
  },
  'Regulacion-Ambiental': {
    name: 'Regulacion Ambiental',
    bgLight: 'bg-rosa-100',
    bgDark: 'dark:bg-rosa-900/50',
    textLight: 'text-rosa-700',
    textDark: 'dark:text-rosa-300',
  },
  'IFC': {
    name: 'IFC',
    bgLight: 'bg-crema-200',
    bgDark: 'dark:bg-crema-400/20',
    textLight: 'text-gris-700',
    textDark: 'dark:text-crema-200',
  },
  'Sostenibilidad': {
    name: 'Sostenibilidad',
    bgLight: 'bg-verde-50',
    bgDark: 'dark:bg-verde-800/50',
    textLight: 'text-verde-600',
    textDark: 'dark:text-verde-400',
  },
  'Estudios-Ambientales': {
    name: 'Estudios Ambientales',
    bgLight: 'bg-rosa-50',
    bgDark: 'dark:bg-rosa-800/50',
    textLight: 'text-rosa-600',
    textDark: 'dark:text-rosa-400',
  },
};

/**
 * Get all categories for navigation
 */
export const categories = Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>;

/**
 * Slugify a string for URLs
 * @param text - Text to slugify
 * @returns URL-safe slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Truncate text to a maximum length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text with ellipsis if needed
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}
