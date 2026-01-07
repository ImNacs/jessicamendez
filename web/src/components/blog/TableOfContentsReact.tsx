import { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

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
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav className="hidden xl:block sticky top-24 self-start" aria-label="Tabla de contenidos">
      <div className="p-4 bg-crema-100 dark:bg-verde-900/30 rounded-xl border border-verde-200 dark:border-verde-800">
        <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-gris-900 dark:text-crema-100 uppercase tracking-wide">
          <BookOpen className="w-4 h-4 text-verde-600 dark:text-verde-400" />
          <span>Contenido</span>
        </div>
        <ul className="space-y-1 text-sm">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 2) * 0.75}rem` }}
            >
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`block w-full text-left py-1.5 px-2 rounded-md transition-all duration-200 cursor-pointer ${
                  activeId === heading.id
                    ? 'text-verde-700 dark:text-verde-300 font-medium bg-verde-100 dark:bg-verde-800/50'
                    : 'text-gris-600 dark:text-crema-300 hover:text-verde-600 dark:hover:text-verde-400 hover:bg-verde-50 dark:hover:bg-verde-900/30'
                }`}
                aria-label={`Ir a la sección: ${heading.text}`}
                aria-current={activeId === heading.id ? 'location' : undefined}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
