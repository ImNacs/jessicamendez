'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  FileText,
  Shield,
  TrendingUp,
  ChevronDown,
  CheckCircle,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { services } from '@/lib/content';

const iconMap = {
  Search,
  FileText,
  Shield,
  TrendingUp,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export function Services() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="servicios" className="py-16 sm:py-20 bg-white dark:bg-[#151a15]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm text-rosa-500 dark:text-rosa-400 uppercase tracking-wider mb-3 block">
            {services.sectionLabel}
          </span>
          <h2 className="text-gris-900 dark:text-crema-100 mb-4">
            {services.title}
          </h2>
          <p className="text-base sm:text-lg text-gris-600 dark:text-crema-300 max-w-2xl mx-auto">
            {services.subtitle}
          </p>
        </motion.div>

        {/* Services Grid - Mobile: Stack, Desktop: 2x2 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto"
        >
          {services.items.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            const isExpanded = expandedId === service.id;
            // En desktop siempre mostrar detalles, en móvil usar expand
            const showDetails = !isMobile || isExpanded;

            return (
              <motion.div key={service.id} variants={cardVariants}>
                <Card
                  className={`h-full transition-all duration-300 card-hover ${
                    isMobile ? 'cursor-pointer' : ''
                  } ${
                    service.highlight
                      ? 'border-verde-200 dark:border-verde-700 hover:border-verde-300 dark:hover:border-verde-600 hover:shadow-lg dark:hover:shadow-verde-900/30'
                      : 'border-gris-200 dark:border-gris-700 hover:border-gris-300 dark:hover:border-gris-600 hover:shadow-md dark:hover:shadow-verde-900/20'
                  } dark:bg-verde-900/20`}
                  onClick={() => isMobile && setExpandedId(isExpanded ? null : service.id)}
                >
                  <CardContent className="p-5 sm:p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shrink-0 ${
                        service.highlight ? 'bg-verde-100 dark:bg-verde-800/50' : 'bg-gris-100 dark:bg-gris-800/50'
                      }`}>
                        <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${
                          service.highlight ? 'text-verde-600 dark:text-verde-400' : 'text-gris-600 dark:text-gris-400'
                        }`} />
                      </div>
                      {/* Chevron solo visible en móvil */}
                      {isMobile && (
                        <button
                          className={`p-1 rounded-full transition-transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                          aria-label={isExpanded ? 'Colapsar' : 'Expandir'}
                        >
                          <ChevronDown className="h-5 w-5 text-gris-400 dark:text-crema-400" />
                        </button>
                      )}
                    </div>

                    {/* Title & Description */}
                    <h3 className={`text-lg sm:text-xl mb-2 ${
                      service.highlight ? 'text-verde-800 dark:text-verde-300' : 'text-gris-800 dark:text-crema-100'
                    }`}>
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gris-600 dark:text-crema-300 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Detalles - Siempre visibles en desktop, expandibles en móvil */}
                    <AnimatePresence>
                      {showDetails && (
                        <motion.div
                          initial={isMobile ? { height: 0, opacity: 0 } : false}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={isMobile ? { height: 0, opacity: 0 } : undefined}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-4 border-t border-gris-100 dark:border-verde-800">
                            <ul className="space-y-2 mb-4">
                              {service.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gris-600 dark:text-crema-300">
                                  <CheckCircle className="h-4 w-4 text-verde-500 dark:text-verde-400 mt-0.5 shrink-0" />
                                  {detail}
                                </li>
                              ))}
                            </ul>
                            <p className="text-xs text-gris-500 dark:text-crema-400">
                              <span className="font-medium">Clientes típicos:</span> {service.clients}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10"
        >
          <p className="text-sm text-gris-500 dark:text-crema-400 mb-4">
            {services.cta.text}
          </p>
          <Button
            variant="outline"
            className="border-verde-300 dark:border-verde-600 text-verde-700 dark:text-verde-300 hover:bg-verde-100 hover:text-verde-800 dark:hover:bg-verde-900/50 dark:hover:text-verde-200"
            asChild
          >
            <a href="#contacto">{services.cta.button}</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
