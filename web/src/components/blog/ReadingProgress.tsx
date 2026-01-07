import { useEffect, useState } from 'react';

interface ReadingProgressProps {
  className?: string;
}

export function ReadingProgress({ className = '' }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const totalHeight = documentHeight - windowHeight;
      const scrollProgress = totalHeight > 0 ? (scrollTop / totalHeight) * 100 : 0;

      setProgress(Math.min(scrollProgress, 100));
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    updateProgress();
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick, { passive: true });

    return () => {
      window.removeEventListener('scroll', requestTick);
      window.removeEventListener('resize', requestTick);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[60] h-1 bg-verde-100/50 dark:bg-verde-900/30 ${className}`}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progreso de lectura"
    >
      <div
        className="h-full bg-gradient-to-r from-verde-500 via-verde-600 to-rosa-500 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
