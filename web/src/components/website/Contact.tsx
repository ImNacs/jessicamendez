'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, MapPin, MessageCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { profile } from '@/lib/utils';

export function Contact() {
  return (
    <section id="contacto" className="py-16 sm:py-20 bg-gradient-to-br from-verde-700 via-verde-800 to-verde-900 dark:from-verde-900 dark:via-verde-950 dark:to-[#0d120d] text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <span className="text-sm text-rosa-300 dark:text-rosa-400 uppercase tracking-wider mb-3 block">
            Contacto
          </span>
          <h2 className="text-white mb-3">
            Trabajemos Juntos
          </h2>
          <p className="text-base sm:text-lg text-verde-100 dark:text-verde-200 max-w-xl mx-auto">
            ¿Tienes un proyecto que requiere gestión ambiental o cumplimiento de estándares internacionales?
          </p>
        </motion.div>

        {/* Quick Actions - Mobile First */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-lg mx-auto mb-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              size="lg"
              className="w-full bg-white dark:bg-crema-100 text-verde-800 dark:text-verde-900 hover:bg-rosa-100 dark:hover:bg-rosa-200 gap-2 h-14 text-base"
              asChild
            >
              <a href={`mailto:${profile.email}`}>
                <Mail className="h-5 w-5" />
                Enviar email
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full bg-transparent border-white/30 dark:border-verde-400/40 text-white hover:bg-white/10 dark:hover:bg-verde-700/30 hover:text-white active:bg-white/20 dark:active:bg-verde-700/50 gap-2 h-14 text-base transition-all"
              asChild
            >
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>
                <Phone className="h-5 w-5" />
                Llamar ahora
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Contact Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white/10 dark:bg-verde-800/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
            {/* Response Time */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/20 dark:border-verde-600/30">
              <div className="w-10 h-10 rounded-full bg-rosa-400/20 dark:bg-rosa-500/20 flex items-center justify-center">
                <Clock className="h-5 w-5 text-rosa-300 dark:text-rosa-400" />
              </div>
              <div>
                <p className="font-medium">Respuesta en menos de 24 horas</p>
                <p className="text-sm text-verde-200 dark:text-verde-300">Para proyectos urgentes, llámame directamente</p>
              </div>
            </div>

            {/* Contact Info Grid */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 dark:hover:bg-verde-700/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 dark:bg-verde-700/40 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-verde-200 dark:text-verde-300">Email</p>
                  <p className="text-white truncate">{profile.email}</p>
                </div>
              </a>

              <a
                href={`tel:${profile.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 dark:hover:bg-verde-700/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 dark:bg-verde-700/40 flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-verde-200 dark:text-verde-300">Teléfono</p>
                  <p className="text-white">{profile.phone}</p>
                </div>
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 dark:hover:bg-verde-700/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 dark:bg-verde-700/40 flex items-center justify-center shrink-0">
                  <Linkedin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-verde-200 dark:text-verde-300">LinkedIn</p>
                  <p className="text-white">jessicamendezgomez</p>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 dark:bg-verde-700/40 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-verde-200 dark:text-verde-300">Ubicación</p>
                  <p className="text-white">{profile.location}</p>
                </div>
              </div>
            </div>

            {/* Who I work with */}
            <div className="mt-6 pt-6 border-t border-white/20 dark:border-verde-600/30">
              <div className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-rosa-300 dark:text-rosa-400 mt-0.5 shrink-0" />
                <p className="text-sm text-verde-100 dark:text-verde-200">
                  Trabajo con <span className="text-white font-medium">desarrolladores de proyectos</span>,{' '}
                  <span className="text-white font-medium">fondos de inversión</span> y{' '}
                  <span className="text-white font-medium">bancos de desarrollo</span> en México, Centroamérica y el Caribe.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
