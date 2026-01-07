'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-crema-50/80 backdrop-blur-md border-b border-verde-100/50">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo - Simple text like original */}
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
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-verde-700"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-crema-50 border-b border-verde-100"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
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
                <a href="#contacto" onClick={() => setIsOpen(false)}>Contactar</a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
