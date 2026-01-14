'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Link2, Twitter, Linkedin, Check } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
  /** Optional description for native share */
  description?: string;
}

export function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  // Check for Web Share API support on mount
  useEffect(() => {
    setCanNativeShare(
      typeof navigator !== 'undefined' &&
      'share' in navigator &&
      typeof navigator.share === 'function'
    );
  }, []);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ];

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title,
        text: description || title,
        url,
      });
      // Track share event
      if (typeof window !== 'undefined' && (window as any).umami) {
        (window as any).umami.track('share_native');
      }
    } catch (err) {
      // User cancelled or error - fail silently
      if ((err as Error).name !== 'AbortError') {
        console.error('Share failed:', err);
      }
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      // Track copy event
      if (typeof window !== 'undefined' && (window as any).umami) {
        (window as any).umami.track('share_copy_link');
      }
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const buttonClasses = `
    flex items-center justify-center w-10 h-10 rounded-lg
    bg-gris-100 dark:bg-verde-900/30
    text-gris-600 dark:text-crema-300
    hover:bg-verde-100 dark:hover:bg-verde-800/50
    hover:text-verde-700 dark:hover:text-verde-300
    transition-[background-color,color] duration-200 ease-out
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verde-500 focus-visible:ring-offset-2
    active:scale-95 active:transition-none
  `.trim();

  return (
    <div className="mt-6 pt-6 border-t border-border">
      <div className="flex items-center gap-2 text-sm text-gris-500 dark:text-crema-400 mb-3">
        <Share2 className="h-4 w-4" aria-hidden="true" />
        <span>Compartir</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Native Share Button - only shown when Web Share API is available */}
        {canNativeShare && (
          <button
            onClick={handleNativeShare}
            className={`${buttonClasses} bg-verde-600 dark:bg-verde-700 text-white hover:bg-verde-700 dark:hover:bg-verde-600 hover:text-white`}
            aria-label="Compartir usando el sistema"
          >
            <Share2 className="h-4 w-4" />
          </button>
        )}

        {/* Social share links */}
        {shareLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses}
              aria-label={`Compartir en ${link.name}`}
            >
              <Icon className="h-4 w-4" />
            </a>
          );
        })}

        {/* Copy link button */}
        <button
          onClick={copyToClipboard}
          className={buttonClasses}
          aria-label={copied ? 'Enlace copiado' : 'Copiar enlace'}
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="check"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
              >
                <Check className="h-4 w-4 text-verde-600 dark:text-verde-400" />
              </motion.span>
            ) : (
              <motion.span
                key="link"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
              >
                <Link2 className="h-4 w-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}

export default ShareButtons;
