import { useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { profile } from '@/lib/utils';

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#acerca', label: 'Acerca de mí' },
  { href: '#experiencia', label: 'Experiencia' },
];

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const menu = menuRef.current;

    if (!button || !menu) return;

    const toggleMenu = () => {
      const isExpanded = button.getAttribute('data-expanded') === 'true';
      button.setAttribute('data-expanded', String(!isExpanded));
      button.setAttribute('aria-expanded', String(!isExpanded));
      menu.setAttribute('data-expanded', String(!isExpanded));
    };

    const closeMenu = () => {
      button.setAttribute('data-expanded', 'false');
      button.setAttribute('aria-expanded', 'false');
      menu.setAttribute('data-expanded', 'false');
    };

    // Add click listener
    button.addEventListener('click', toggleMenu);

    // Close menu when clicking nav links
    const links = menu.querySelectorAll('a');
    links.forEach(link => link.addEventListener('click', closeMenu));

    return () => {
      button.removeEventListener('click', toggleMenu);
      links.forEach(link => link.removeEventListener('click', closeMenu));
    };
  }, []);

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-crema-50/80 backdrop-blur-md border-b border-verde-100/50">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="font-serif text-xl font-bold text-verde-700">
          {profile.shortName}
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gris-600 hover:text-verde-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button
            asChild
            size="sm"
            className="bg-verde-600 hover:bg-verde-700 text-white"
          >
            <a href="#contacto">Contactar</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={buttonRef}
          type="button"
          data-expanded="false"
          aria-expanded="false"
          aria-label="Toggle menu"
          className="mobile-menu-button md:hidden p-3 text-verde-700 cursor-pointer touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <Menu size={28} className="menu-icon pointer-events-none" />
          <X size={28} className="close-icon pointer-events-none" />
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        ref={menuRef}
        data-expanded="false"
        className="mobile-menu md:hidden bg-crema-50 border-b border-verde-100 overflow-hidden"
      >
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gris-600 hover:text-verde-600 transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
          <Button
            asChild
            size="sm"
            className="w-full bg-verde-600 hover:bg-verde-700"
          >
            <a href="#contacto">Contactar</a>
          </Button>
        </div>
      </div>

      <style>{`
        .mobile-menu-button .close-icon {
          display: none;
        }
        .mobile-menu-button[data-expanded="true"] .menu-icon {
          display: none;
        }
        .mobile-menu-button[data-expanded="true"] .close-icon {
          display: block;
        }
        .mobile-menu {
          max-height: 0;
          opacity: 0;
          transition: max-height 0.3s ease, opacity 0.3s ease;
        }
        .mobile-menu[data-expanded="true"] {
          max-height: 300px;
          opacity: 1;
        }
      `}</style>
    </header>
  );
}
