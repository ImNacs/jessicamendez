'use client';

import { useState } from 'react';
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

// Servicios ordenados por demanda según investigación
const services = [
  {
    id: 'due-diligence',
    icon: Search,
    title: 'Due Diligence Ambiental y Social',
    shortTitle: 'Due Diligence',
    description: 'Evaluación de riesgos ESG para transacciones, inversiones y financiamiento de proyectos.',
    details: [
      'Evaluación de pasivos ambientales',
      'Análisis de cumplimiento normativo',
      'Gap analysis vs estándares IFC',
      'Planes de acción correctiva',
    ],
    clients: 'Fondos de inversión, bancos, corporativos',
    highlight: true,
  },
  {
    id: 'esia',
    icon: FileText,
    title: 'Evaluaciones de Impacto',
    shortTitle: 'MIA / ESIA',
    description: 'Manifestaciones de Impacto Ambiental y estudios técnicos para autorización de proyectos.',
    details: [
      'MIA Particular y Regional',
      'Estudios Técnicos Justificativos (ETJ)',
      'Evaluación de Impacto Social (EVIS)',
      'Gestión de permisos ante SEMARNAT',
    ],
    clients: 'Desarrolladores de proyectos',
    highlight: true,
  },
  {
    id: 'ifc',
    icon: Shield,
    title: 'Cumplimiento IFC y Principios de Ecuador',
    shortTitle: 'Estándares Internacionales',
    description: 'Alineación con estándares de financiamiento internacional para proyectos de inversión.',
    details: [
      'IFC Performance Standards',
      'Principios de Ecuador (EP4)',
      'Planes de Gestión Ambiental y Social',
      'Mecanismos de quejas y reclamos',
    ],
    clients: 'Proyectos con financiamiento multilateral',
    highlight: true,
  },
  {
    id: 'esg',
    icon: TrendingUp,
    title: 'Consultoría ESG y Sostenibilidad',
    shortTitle: 'ESG',
    description: 'Estrategias de sostenibilidad corporativa y reportes para inversionistas.',
    details: [
      'Diagnósticos ESG',
      'Estrategias de descarbonización',
      'Reportes de sostenibilidad (GRI, SASB)',
      'Evaluación de riesgos climáticos',
    ],
    clients: 'Corporativos, empresas listadas',
    highlight: false,
  },
];

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
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export function Services() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
          <h2 className="text-2xl sm:text-3xl md:text-[2.25rem] text-gris-900 dark:text-crema-100 mb-4">
            Servicios Especializados
          </h2>
          <p className="text-base sm:text-lg text-gris-600 dark:text-crema-300 max-w-2xl mx-auto">
            Soluciones integrales desde la factibilidad hasta la operación de tu proyecto
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
          {services.map((service) => {
            const Icon = service.icon;
            const isExpanded = expandedId === service.id;

            return (
              <motion.div key={service.id} variants={cardVariants}>
                <Card
                  className={`h-full transition-all duration-300 cursor-pointer ${
                    service.highlight
                      ? 'border-verde-200 dark:border-verde-700 hover:border-verde-300 dark:hover:border-verde-600 hover:shadow-lg dark:hover:shadow-verde-900/30'
                      : 'border-gris-200 dark:border-gris-700 hover:border-gris-300 dark:hover:border-gris-600 hover:shadow-md dark:hover:shadow-verde-900/20'
                  } dark:bg-verde-900/20`}
                  onClick={() => setExpandedId(isExpanded ? null : service.id)}
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
                      <button
                        className={`p-1 rounded-full transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                        aria-label={isExpanded ? 'Colapsar' : 'Expandir'}
                      >
                        <ChevronDown className="h-5 w-5 text-gris-400 dark:text-crema-400" />
                      </button>
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

                    {/* Progressive Disclosure - Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
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
            ¿No encuentras lo que buscas? Ofrezco soluciones personalizadas.
          </p>
          <Button
            variant="outline"
            className="border-verde-300 dark:border-verde-600 text-verde-700 dark:text-verde-300 hover:bg-verde-50 dark:hover:bg-verde-900/50"
            asChild
          >
            <a href="#contacto">Consultar otros servicios</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
