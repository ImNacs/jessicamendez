'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Award, Globe, Users } from 'lucide-react';
import { profile } from '@/lib/utils';

const differentiators = [
  {
    icon: Award,
    title: 'Experiencia comprobada',
    description: 'Track record en proyectos de infraestructura, energía y minería.',
  },
  {
    icon: Globe,
    title: 'Estándares internacionales',
    description: 'Dominio de IFC Performance Standards y Principios de Ecuador.',
  },
  {
    icon: Users,
    title: 'Enfoque integral',
    description: 'Gestión ambiental y social con visión de financiamiento.',
  },
];

const highlights = [
  'Gestión de proyectos ante SEMARNAT y autoridades ambientales',
  'Due diligence para bancos de desarrollo y fondos de inversión',
  'Planes de gestión ambiental y social (PGAS)',
  'Consulta pública y relacionamiento comunitario',
];

export function About() {
  return (
    <section id="acerca" className="py-16 sm:py-20 bg-verde-50/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative max-w-md mx-auto lg:max-w-none">
              {/* Image */}
              <div className="relative bg-white p-2 rounded-2xl shadow-lg">
                <img
                  src="/jessicamendez.png"
                  alt="Jessica Méndez - Bióloga y Consultora Ambiental"
                  className="w-full h-auto rounded-xl"
                  loading="lazy"
                />
              </div>

              {/* Experience badge */}
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-verde-600 text-white px-4 py-2 sm:px-5 sm:py-3 rounded-xl shadow-lg">
                <p className="text-xl sm:text-2xl font-bold">{profile.experience}</p>
                <p className="text-xs opacity-90">de experiencia</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gris-900 mb-2">
              {profile.name}
            </h2>
            <p className="text-rosa-600 font-medium mb-4">{profile.title}</p>

            <p className="text-base sm:text-lg text-gris-700 mb-6 leading-relaxed">
              Consultora independiente especializada en la gestión ambiental y social
              de proyectos de infraestructura, energía y minería, con experiencia en
              México, Centroamérica y República Dominicana.
            </p>

            {/* Key highlights - Progressive disclosure on mobile */}
            <div className="space-y-2 mb-6">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-2"
                >
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-verde-500 mt-0.5 shrink-0" />
                  <span className="text-sm sm:text-base text-gris-600">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <div className="p-4 bg-white border-l-4 border-verde-500 rounded-r-lg shadow-sm">
              <p className="text-verde-800 italic font-serif text-sm sm:text-base">
                "Combino conocimiento normativo local con estándares internacionales
                para crear valor sostenible en cada proyecto."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Differentiators - Below on all screens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 sm:mt-16 grid sm:grid-cols-3 gap-6"
        >
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-sm"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-verde-100 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-verde-600" />
                </div>
                <h3 className="font-semibold text-gris-800 mb-1">{item.title}</h3>
                <p className="text-sm text-gris-600">{item.description}</p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
