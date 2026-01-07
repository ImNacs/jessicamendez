import { Leaf, Mail, Phone, Linkedin } from 'lucide-react';
import { profile } from '@/lib/utils';

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#acerca', label: 'Acerca de mí' },
  { href: '#experiencia', label: 'Experiencia' },
  { href: '#contacto', label: 'Contacto' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-verde-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Leaf className="h-6 w-6 text-rosa-300" />
              <span className="font-serif text-xl font-bold">{profile.shortName}</span>
            </div>
            <p className="text-verde-200 text-sm mb-2">
              {profile.title}
            </p>
            <p className="text-verde-300/70 text-sm max-w-md">
              Tu aliada en regulación ambiental y estrategias de sostenibilidad.
              Transformando desafíos ambientales en oportunidades de desarrollo sostenible.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-serif font-semibold mb-4 text-rosa-300">Navegación</h4>
            <nav className="space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-verde-200 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-semibold mb-4 text-rosa-300">Contacto</h4>
            <div className="space-y-3">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-verde-200 hover:text-white transition-colors text-sm"
              >
                <Mail className="h-4 w-4 text-rosa-400" />
                {profile.email}
              </a>
              <a
                href={`tel:${profile.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-3 text-verde-200 hover:text-white transition-colors text-sm"
              >
                <Phone className="h-4 w-4 text-rosa-400" />
                {profile.phone}
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-verde-200 hover:text-white transition-colors text-sm"
              >
                <Linkedin className="h-4 w-4 text-rosa-400" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-verde-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-verde-300/60 text-sm">
              &copy; {currentYear} {profile.shortName}. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-2 text-verde-300/60 text-sm">
              <Leaf className="h-4 w-4 text-verde-500" />
              <span>Comprometida con la sostenibilidad</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
