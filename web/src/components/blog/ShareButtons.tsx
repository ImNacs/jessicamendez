'use client';

import { useState } from 'react';
import { Share2, Link2, Twitter, Linkedin, Check } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="mt-6 pt-6 border-t border-border">
      <div className="flex items-center gap-2 text-sm text-gris-500 dark:text-crema-400 mb-3">
        <Share2 className="h-4 w-4" />
        <span>Compartir</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {shareLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-gris-100 dark:bg-verde-900/30 text-gris-600 dark:text-crema-300 hover:bg-verde-100 dark:hover:bg-verde-800/50 hover:text-verde-700 dark:hover:text-verde-300 transition-all duration-200"
              aria-label={`Compartir en ${link.name}`}
            >
              <Icon className="h-4 w-4" />
            </a>
          );
        })}

        <button
          onClick={copyToClipboard}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-gris-100 dark:bg-verde-900/30 text-gris-600 dark:text-crema-300 hover:bg-verde-100 dark:hover:bg-verde-800/50 hover:text-verde-700 dark:hover:text-verde-300 transition-all duration-200"
          aria-label="Copiar enlace"
        >
          {copied ? (
            <Check className="h-4 w-4 text-verde-600 dark:text-verde-400" />
          ) : (
            <Link2 className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}

export default ShareButtons;
