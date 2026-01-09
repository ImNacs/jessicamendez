import { Leaf, Mail, Phone, LinkedinIcon } from 'lucide-react';
import { profile } from '@/lib/utils';
import { Logo } from '@/components/ui/Logo';
import { NewsletterForm } from '@/components/blog/NewsletterForm';

const navLinks = [
  { href: '/#inicio', label: 'Inicio' },
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#acerca', label: 'Acerca de mí' },
  { href: '/#experiencia', label: 'Experiencia' },
  { href: '/blog/', label: 'Blog' },
  { href: '/#contacto', label: 'Contacto' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-verde-900 dark:bg-[#0d120d] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand + Newsletter */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <Logo size="sm" variant="on-dark" />
            </div>
            <p className="text-verde-200 dark:text-verde-300 text-sm mb-2">
              {profile.title}
            </p>
            <p className="text-verde-300/70 dark:text-verde-400/70 text-sm max-w-md mb-6">
              Tu aliada en regulación ambiental y estrategias de sostenibilidad.
              Transformando desafíos ambientales en oportunidades de desarrollo sostenible.
            </p>
            {/* Newsletter - Se mostrará cuando se configure el dominio en Resend */}
            {!import.meta.env.PROD && (
              <div className="max-w-sm p-4 bg-verde-800/50 dark:bg-verde-950/50 rounded-xl border border-verde-700/50 dark:border-verde-800/50">
                <p className="text-white font-medium text-sm mb-2">
                  Suscríbete al newsletter
                </p>
                <p className="text-verde-300 dark:text-verde-400 text-xs mb-3">
                  Recibe artículos sobre regulación ambiental y sostenibilidad.
                </p>
                <NewsletterForm variant="inline" />
              </div>
            )}
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm mb-4 text-rosa-300 dark:text-rosa-400">Navegacion</h4>
            <nav className="space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-verde-200 dark:text-verde-300 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm mb-4 text-rosa-300 dark:text-rosa-400">Contacto</h4>
            <div className="space-y-3">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-verde-200 dark:text-verde-300 hover:text-white transition-colors text-sm"
              >
                <Mail className="h-4 w-4 text-rosa-400 dark:text-rosa-500" />
                {profile.email}
              </a>
              <a
                href={`tel:${profile.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-3 text-verde-200 dark:text-verde-300 hover:text-white transition-colors text-sm"
              >
                <Phone className="h-4 w-4 text-rosa-400 dark:text-rosa-500" />
                {profile.phone}
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-verde-200 dark:text-verde-300 hover:text-white transition-colors text-sm"
              >
                <LinkedinIcon className="h-4 w-4 text-rosa-400 dark:text-rosa-500" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-verde-800 dark:border-verde-900">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-verde-300/60 dark:text-verde-400/60 text-sm">
              &copy; {currentYear} {profile.shortName}. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-2 text-verde-300/60 dark:text-verde-400/60 text-sm">
              <Leaf className="h-4 w-4 text-verde-500 dark:text-verde-600" />
              <span>Comprometida con la sostenibilidad</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
