'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { profile } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const credentials = [
  'IFC Performance Standards',
  'Principios de Ecuador',
  'SEMARNAT',
];

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16 pb-12"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-crema-50 via-white to-verde-50/30" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto px-4 text-center max-w-3xl"
      >
        {/* Credibility badge - Above the fold */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 bg-verde-50 border border-verde-200 rounded-full mb-6"
        >
          <Shield className="h-4 w-4 text-verde-600" />
          <span className="text-sm text-verde-700 font-medium">
            {profile.experience} de experiencia en gestión ambiental
          </span>
        </motion.div>

        {/* Main heading - Clear value proposition */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gris-900 mb-6 leading-tight"
        >
          Tu aliada en{' '}
          <span className="text-verde-600">regulación ambiental</span>{' '}
          y{' '}
          <span className="text-rosa-500">financiamiento sostenible</span>
        </motion.h1>

        {/* Subtitle - What you solve */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-gris-600 mb-6 max-w-2xl mx-auto leading-relaxed"
        >
          Acompaño a desarrolladores de proyectos y entidades financieras en la obtención
          de permisos ambientales y cumplimiento de estándares internacionales.
        </motion.p>

        {/* Credentials - Trust signals */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {credentials.map((credential) => (
            <div
              key={credential}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gris-200 rounded-full text-sm text-gris-700"
            >
              <CheckCircle className="h-3.5 w-3.5 text-verde-500" />
              {credential}
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons - Primary action */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button
            size="lg"
            className="gap-2 bg-verde-600 hover:bg-verde-700 text-white text-base px-8"
            asChild
          >
            <a href="#contacto">
              Agenda una consulta
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-gris-300 text-gris-700 hover:bg-verde-50 hover:border-verde-400 hover:text-verde-700 active:bg-verde-100 text-base transition-colors"
            asChild
          >
            <a href="#servicios">Ver servicios</a>
          </Button>
        </motion.div>

        {/* Social proof - Quick stats */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-gris-200"
        >
          <p className="text-sm text-gris-500 mb-4">Especialista en sectores de alto impacto</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-medium text-gris-600">
            <span>Energía Renovable</span>
            <span className="hidden sm:inline text-gris-300">•</span>
            <span>Infraestructura</span>
            <span className="hidden sm:inline text-gris-300">•</span>
            <span>Minería</span>
            <span className="hidden sm:inline text-gris-300">•</span>
            <span>Oil & Gas</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
