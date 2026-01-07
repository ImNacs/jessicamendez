'use client';

import { motion } from 'framer-motion';
import { Building2, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { experience } from '@/lib/utils';

const regions = [
  { name: 'México', flag: '🇲🇽' },
  { name: 'Centroamérica', flag: '🌎' },
  { name: 'Rep. Dominicana', flag: '🇩🇴' },
];

export function Experience() {
  return (
    <section id="experiencia" className="py-16 sm:py-20 bg-white dark:bg-[#151a15]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-[2.25rem] text-gris-900 dark:text-crema-100 mb-4">
            Trayectoria Profesional
          </h2>
          <p className="text-base sm:text-lg text-gris-600 dark:text-crema-300 max-w-xl mx-auto">
            Experiencia en proyectos de alto impacto para el sector privado y financiero
          </p>
        </motion.div>

        {/* Timeline - Simplified for mobile */}
        <div className="max-w-2xl mx-auto mb-12">
          {experience.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.role}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`relative pl-6 sm:pl-8 pb-8 ${
                index < experience.length - 1 ? 'border-l-2 border-verde-200 dark:border-verde-700' : ''
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-0 w-3 h-3 sm:w-4 sm:h-4 -translate-x-1/2 rounded-full bg-rosa-400 dark:bg-rosa-500 border-4 border-white dark:border-[#151a15]" />

              {/* Content */}
              <div className="bg-gris-50 dark:bg-verde-900/30 rounded-lg p-4 sm:p-5">
                <Badge variant="outline" className="mb-2 text-xs border-rosa-200 dark:border-rosa-700 text-rosa-600 dark:text-rosa-400">
                  {exp.period}
                </Badge>
                <h3 className="font-semibold text-gris-900 dark:text-crema-100 text-base sm:text-lg">{exp.role}</h3>
                <div className="flex items-center gap-2 text-verde-600 dark:text-verde-400 text-sm font-medium mt-1">
                  <Building2 className="h-4 w-4" />
                  {exp.company}
                </div>
                <p className="text-sm text-gris-600 dark:text-crema-300 mt-2">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Geographic Reach */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-verde-700 dark:bg-verde-800 rounded-2xl p-6 sm:p-8 text-white text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="h-5 w-5" />
            <h3 className="text-lg sm:text-xl font-semibold">Alcance Regional</h3>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-4">
            {regions.map((region) => (
              <div key={region.name} className="flex items-center gap-2">
                <span className="text-2xl">{region.flag}</span>
                <span className="text-sm sm:text-base font-medium">{region.name}</span>
              </div>
            ))}
          </div>

          <p className="text-verde-100 dark:text-verde-200 text-sm max-w-lg mx-auto">
            Alianzas estratégicas y experiencia liderando equipos multidisciplinarios
            en proyectos internacionales.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
