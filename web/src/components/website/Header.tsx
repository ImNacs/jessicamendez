import { useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';
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
  const overlayRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const menu = menuRef.current;
    const overlay = overlayRef.current;

    if (!button || !menu || !overlay) return;

    const toggleMenu = () => {
      const isExpanded = button.getAttribute('data-expanded') === 'true';
      const newState = String(!isExpanded);
      button.setAttribute('data-expanded', newState);
      button.setAttribute('aria-expanded', newState);
      menu.setAttribute('data-expanded', newState);
      overlay.setAttribute('data-expanded', newState);

      // Prevent body scroll when menu is open
      if (!isExpanded) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    const closeMenu = () => {
      button.setAttribute('data-expanded', 'false');
      button.setAttribute('aria-expanded', 'false');
      menu.setAttribute('data-expanded', 'false');
      overlay.setAttribute('data-expanded', 'false');
      document.body.style.overflow = '';
    };

    // Add click listener
    button.addEventListener('click', toggleMenu);

    // Close menu when clicking overlay
    overlay.addEventListener('click', closeMenu);

    // Close menu when clicking nav links
    const links = menu.querySelectorAll('a');
    links.forEach(link => link.addEventListener('click', closeMenu));

    return () => {
      button.removeEventListener('click', toggleMenu);
      overlay.removeEventListener('click', closeMenu);
      links.forEach(link => link.removeEventListener('click', closeMenu));
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="font-serif text-xl font-bold text-primary">
          {profile.shortName}
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button
            asChild
            size="sm"
            className="bg-verde-600 hover:bg-verde-700 dark:bg-verde-500 dark:hover:bg-verde-400 text-white dark:text-verde-950"
          >
            <a href="#contacto">Contactar</a>
          </Button>
          <ModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={buttonRef}
          type="button"
          data-expanded="false"
          aria-expanded="false"
          aria-label="Toggle menu"
          className="mobile-menu-button md:hidden p-3 text-primary cursor-pointer touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <Menu size={28} className="menu-icon pointer-events-none" />
          <X size={28} className="close-icon pointer-events-none" />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={overlayRef}
        data-expanded="false"
        className="mobile-overlay"
        aria-hidden="true"
      />

      {/* Mobile Navigation Panel */}
      <div
        ref={menuRef}
        data-expanded="false"
        className="mobile-menu"
      >
        {/* Menu Header with Brand */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold text-primary">
              {profile.shortName}
            </span>
            <span className="text-xs text-muted-foreground">
              Consultora Ambiental
            </span>
          </div>
          <button
            type="button"
            onClick={() => buttonRef.current?.click()}
            className="p-2 rounded-full hover:bg-muted/50 transition-colors"
            aria-label="Cerrar menu"
          >
            <X size={24} className="text-muted-foreground" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="mobile-nav-link group flex items-center px-4 py-3.5 rounded-xl text-base font-medium text-foreground/80 hover:text-primary hover:bg-verde-50 dark:hover:bg-verde-950/30 transition-all duration-200"
                >
                  <span className="flex-1">{link.label}</span>
                  <svg
                    className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="mt-6 px-4">
            <Button
              asChild
              size="lg"
              className="w-full h-14 text-base font-semibold bg-verde-600 hover:bg-verde-700 dark:bg-verde-500 dark:hover:bg-verde-400 text-white dark:text-verde-950 rounded-xl shadow-lg shadow-verde-600/20 dark:shadow-verde-500/20"
            >
              <a href="#contacto">Contactar</a>
            </Button>
          </div>
        </nav>

        {/* Menu Footer with Theme Toggle */}
        <div className="border-t border-border/50 px-6 py-4 bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Sun size={18} className="text-amber-500 dark:hidden" />
                <Moon size={18} className="text-indigo-400 hidden dark:block" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">Apariencia</span>
                <span className="text-xs text-muted-foreground">
                  <span className="dark:hidden">Modo claro</span>
                  <span className="hidden dark:inline">Modo oscuro</span>
                </span>
              </div>
            </div>
            <ModeToggle />
          </div>
        </div>
      </div>

      <style>{`
        /* Mobile Menu Button Icons */
        .mobile-menu-button .close-icon {
          display: none;
        }
        .mobile-menu-button[data-expanded="true"] .menu-icon {
          display: none;
        }
        .mobile-menu-button[data-expanded="true"] .close-icon {
          display: block;
        }

        /* Overlay Styles */
        .mobile-overlay {
          position: fixed;
          inset: 0;
          top: 64px;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
          z-index: 40;
        }
        .mobile-overlay[data-expanded="true"] {
          opacity: 1;
          visibility: visible;
        }
        @media (min-width: 768px) {
          .mobile-overlay {
            display: none !important;
          }
        }

        /* Mobile Menu Panel */
        .mobile-menu {
          position: fixed;
          top: 64px;
          left: 0;
          right: 0;
          bottom: 0;
          background: hsl(var(--background));
          display: flex;
          flex-direction: column;
          transform: translateY(-100%);
          opacity: 0;
          visibility: hidden;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.3s ease,
                      visibility 0.3s ease;
          z-index: 45;
          overflow: hidden;
        }
        .mobile-menu[data-expanded="true"] {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }
        @media (min-width: 768px) {
          .mobile-menu {
            display: none !important;
          }
        }

        /* Navigation Link Hover Effect */
        .mobile-nav-link {
          min-height: 52px;
          touch-action: manipulation;
        }

        /* Smooth stagger animation for links */
        .mobile-menu[data-expanded="true"] .mobile-nav-link {
          animation: slideInFromLeft 0.4s ease forwards;
        }
        .mobile-menu[data-expanded="true"] li:nth-child(1) .mobile-nav-link { animation-delay: 0.05s; }
        .mobile-menu[data-expanded="true"] li:nth-child(2) .mobile-nav-link { animation-delay: 0.1s; }
        .mobile-menu[data-expanded="true"] li:nth-child(3) .mobile-nav-link { animation-delay: 0.15s; }
        .mobile-menu[data-expanded="true"] li:nth-child(4) .mobile-nav-link { animation-delay: 0.2s; }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-16px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Initial state for animation */
        .mobile-nav-link {
          opacity: 0;
        }
        .mobile-menu:not([data-expanded="true"]) .mobile-nav-link {
          opacity: 1;
          animation: none;
        }
      `}</style>
    </header>
  );
}
