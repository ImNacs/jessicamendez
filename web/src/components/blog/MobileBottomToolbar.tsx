import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Share2, X } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface MobileBottomToolbarProps {
  headings: Heading[];
  shareUrl: string;
  shareTitle: string;
  showBackButton?: boolean;
}

export function MobileBottomToolbar({
  headings,
  shareUrl,
  shareTitle,
  showBackButton = true,
}: MobileBottomToolbarProps) {
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('');

  // Track active heading with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  // Smart back navigation
  const handleBack = () => {
    if (window.history.length > 1 && document.referrer) {
      window.history.back();
    } else {
      window.location.href = '/blog';
    }
  };

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isTocOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isTocOpen]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setIsTocOpen(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
    }
  };

  return (
    <>
      {/* Sticky Bottom Toolbar - Solo Mobile/Tablet (< XL) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 xl:hidden">
        <div
          className="bg-crema-50/95 dark:bg-verde-950/95 backdrop-blur-md border-t border-verde-200 dark:border-verde-800 shadow-lg"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="flex items-center justify-around px-4 py-3">
            {/* Back Button */}
            {showBackButton && (
              <motion.button
                onClick={handleBack}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-1 min-w-[64px] text-gris-500 dark:text-crema-400 hover:text-verde-600 dark:hover:text-verde-400 transition-colors"
                aria-label="Volver a la página anterior"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-xs font-medium">Volver</span>
              </motion.button>
            )}

            {/* TOC Button */}
            {headings.length > 0 && (
              <motion.button
                onClick={() => setIsTocOpen(true)}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-1 min-w-[64px] text-gris-500 dark:text-crema-400 hover:text-verde-600 dark:hover:text-verde-400 transition-colors"
                aria-label="Abrir tabla de contenidos"
              >
                <div className="relative">
                  <BookOpen className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-verde-600 dark:bg-verde-500 rounded-full">
                    {headings.length}
                  </span>
                </div>
                <span className="text-xs font-medium">Índice</span>
              </motion.button>
            )}

            {/* Share Button */}
            <motion.button
              onClick={handleShare}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-1 min-w-[64px] text-gris-500 dark:text-crema-400 hover:text-verde-600 dark:hover:text-verde-400 transition-colors"
              aria-label="Compartir artículo"
            >
              <Share2 className="w-5 h-5" />
              <span className="text-xs font-medium">Compartir</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* TOC Drawer */}
      <AnimatePresence>
        {isTocOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsTocOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 xl:hidden backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-crema-50 dark:bg-verde-950 rounded-t-2xl shadow-2xl max-h-[80vh] overflow-hidden xl:hidden"
              style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
            >
              {/* Drawer Header */}
              <div className="sticky top-0 z-10 bg-crema-50 dark:bg-verde-950 border-b border-verde-200 dark:border-verde-800 px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-verde-600 dark:text-verde-400" />
                    <h2 className="text-lg font-serif font-semibold text-gris-900 dark:text-crema-100">
                      Tabla de Contenidos
                    </h2>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-verde-100 dark:bg-verde-900/50 text-verde-700 dark:text-verde-300">
                      {headings.length}
                    </span>
                  </div>
                  <motion.button
                    onClick={() => setIsTocOpen(false)}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-verde-100 dark:hover:bg-verde-900/50 text-gris-500 dark:text-crema-400 hover:text-gris-700 dark:hover:text-crema-200 transition-colors"
                    aria-label="Cerrar tabla de contenidos"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Drag indicator */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gris-300 dark:bg-verde-700 rounded-full" />
              </div>

              {/* Drawer Content - Scrollable */}
              <div className="overflow-y-auto px-4 py-4 max-h-[calc(80vh-80px)]">
                <nav>
                  <ul className="space-y-1">
                    {headings.map((heading) => (
                      <li
                        key={heading.id}
                        style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
                      >
                        <motion.button
                          onClick={() => scrollToHeading(heading.id)}
                          whileTap={{ scale: 0.98 }}
                          className={`block w-full text-left py-3 px-4 rounded-lg transition-all ${
                            activeId === heading.id
                              ? 'text-verde-700 dark:text-verde-300 font-semibold bg-verde-100 dark:bg-verde-900/50 border-l-4 border-l-verde-500'
                              : 'text-gris-600 dark:text-crema-300 hover:text-gris-900 dark:hover:text-crema-100 hover:bg-verde-50 dark:hover:bg-verde-900/30 border-l-4 border-l-transparent'
                          }`}
                        >
                          <span className="text-base leading-relaxed">
                            {heading.text}
                          </span>
                        </motion.button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
