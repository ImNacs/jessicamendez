'use client';

import { motion } from 'framer-motion';
import { Building2, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { experience } from '@/lib/utils';

// Regions with accessible labels
const regions = [
  { name: 'México', flag: '🇲🇽', code: 'MX' },
  { name: 'Centroamérica', flag: '🌎', code: 'LATAM' },
  { name: 'Rep. Dominicana', flag: '🇩🇴', code: 'DO' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export function Experience() {
  return (
    <section id="experiencia" className="py-16 sm:py-20 bg-white dark:bg-[#151a15]">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm text-rosa-500 dark:text-rosa-400 uppercase tracking-wider mb-3 block">
            Trayectoria
          </span>
          <h2 className="text-gris-900 dark:text-crema-100 mb-4">
            Más de una década <br className="hidden sm:block" />
            <span className="text-verde-600 dark:text-verde-400">transformando proyectos</span>
          </h2>
          <p className="text-base sm:text-lg text-gris-600 dark:text-crema-300 max-w-xl mx-auto">
            Experiencia en proyectos de alto impacto para el sector privado y financiero
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="max-w-2xl mx-auto mb-12"
        >
          {experience.map((exp, index) => (
            <motion.article
              key={`${exp.company}-${exp.role}`}
              variants={itemVariants}
              className={`relative pl-8 sm:pl-10 pb-10 ${
                index < experience.length - 1 ? 'border-l-2 border-verde-200 dark:border-verde-800' : ''
              }`}
            >
              {/* Timeline dot */}
              <div
                className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-rosa-400 dark:bg-rosa-500 border-4 border-white dark:border-[#151a15] shadow-sm"
                aria-hidden="true"
              />

              {/* Content card */}
              <div className="group bg-gris-50 dark:bg-verde-900/30 rounded-xl p-5 sm:p-6 hover:shadow-lg dark:hover:shadow-verde-900/40 transition-all duration-300 card-hover">
                {/* Period badge */}
                <Badge
                  variant="outline"
                  className="mb-3 text-xs border-rosa-200 dark:border-rosa-700 text-rosa-600 dark:text-rosa-400 bg-rosa-50 dark:bg-rosa-900/20"
                >
                  {exp.period}
                </Badge>

                {/* Role */}
                <h3 className="font-serif text-lg sm:text-xl text-gris-900 dark:text-crema-100 mb-1 group-hover:text-verde-700 dark:group-hover:text-verde-300 transition-colors">
                  {exp.role}
                </h3>

                {/* Company */}
                <div className="flex items-center gap-2 text-verde-600 dark:text-verde-400 text-sm font-medium mb-3">
                  <Building2 className="h-4 w-4" aria-hidden="true" />
                  <span>{exp.company}</span>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-gris-600 dark:text-crema-300 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Geographic Reach */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-verde-700 dark:bg-verde-800 rounded-2xl p-6 sm:p-8 text-white max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <MapPin className="h-5 w-5" aria-hidden="true" />
            <h3 className="text-lg sm:text-xl font-serif">Alcance Regional</h3>
          </div>

          {/* Regions with accessible flags */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-6">
            {regions.map((region) => (
              <div key={region.code} className="flex flex-col items-center gap-2">
                <span
                  className="text-3xl sm:text-4xl"
                  role="img"
                  aria-label={region.name}
                >
                  {region.flag}
                </span>
                <div className="text-center">
                  <span className="block text-sm font-medium text-white">
                    {region.name}
                  </span>
                  <span className="text-xs text-verde-200 uppercase tracking-wider">
                    {region.code}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-verde-100 dark:text-verde-200 text-sm sm:text-base text-center max-w-lg mx-auto">
            Alianzas estratégicas y experiencia liderando equipos multidisciplinarios
            en proyectos internacionales.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
