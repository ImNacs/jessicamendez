'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const regions = [
  { name: 'México' },
  { name: 'Centroamérica' },
  { name: 'República Dominicana' },
];

export function Reach() {
  return (
    <section className="py-20 bg-verde-700 text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Alcance
          </h2>
        </motion.div>

        {/* Regions */}
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-10">
          {regions.map((region, index) => (
            <motion.div
              key={region.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/10 flex items-center justify-center">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold">{region.name}</h3>
            </motion.div>
          ))}
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-verde-100 max-w-2xl mx-auto"
        >
          Cuento con alianzas estratégicas y experiencia liderando proyectos y equipos
          multidisciplinarios de especialistas en México, Centroamérica y República Dominicana.
        </motion.p>
      </div>
    </section>
  );
}
