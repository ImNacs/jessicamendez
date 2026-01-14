'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Award, Globe, Users } from 'lucide-react';
import { profile, about } from '@/lib/content';

const iconMap = {
  Award,
  Globe,
  Users,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

export function About() {
  return (
    <section id="acerca" className="py-16 sm:py-20 bg-verde-50/50 dark:bg-verde-950/30">
      <div className="container mx-auto px-4 sm:px-6">
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
              {/* Decorative frame */}
              <div
                className="absolute -inset-3 border-2 border-verde-200 dark:border-verde-700 rounded-2xl transform -rotate-2"
                aria-hidden="true"
              />

              {/* Image container */}
              <div className="relative bg-white dark:bg-verde-900/50 p-2 rounded-2xl shadow-xl dark:shadow-verde-900/30">
                <picture>
                  <source srcSet="/jessicamendez.avif" type="image/avif" />
                  <source srcSet="/jessicamendez.webp" type="image/webp" />
                  <img
                    src="/jessicamendez.webp"
                    alt="Jessica Méndez - Bióloga y Consultora Ambiental"
                    className="w-full h-auto rounded-xl"
                    width={800}
                    height={1365}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                  />
                </picture>
              </div>

              {/* Experience badge */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 bg-verde-600 dark:bg-verde-500 text-white px-5 py-3 rounded-xl shadow-lg">
                <p className="text-2xl sm:text-3xl font-serif font-semibold">{profile.experience}</p>
                <p className="text-xs uppercase tracking-wider opacity-90">{about.experienceBadge}</p>
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
            {/* Section label */}
            <span className="text-sm text-rosa-500 dark:text-rosa-400 uppercase tracking-wider mb-3 block">
              {about.sectionLabel}
            </span>

            <h2 className="text-gris-900 dark:text-crema-100 mb-2">
              {profile.name}
            </h2>
            <p className="text-rosa-600 dark:text-rosa-400 font-medium text-lg mb-4">
              {profile.title}
            </p>

            <p className="text-base sm:text-lg text-gris-700 dark:text-crema-300 mb-6 leading-relaxed">
              {about.description}
            </p>

            {/* Key highlights */}
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3 mb-6"
            >
              {about.highlights.map((item, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-3"
                >
                  <CheckCircle
                    className="h-5 w-5 text-verde-500 dark:text-verde-400 mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-sm sm:text-base text-gris-600 dark:text-crema-300">
                    {item}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Quote */}
            <div className="p-5 bg-white dark:bg-verde-900/40 border-l-4 border-verde-500 dark:border-verde-400 rounded-r-xl shadow-sm">
              <p className="text-verde-800 dark:text-verde-200 italic font-serif text-base sm:text-lg leading-relaxed">
                "{about.quote}"
              </p>
            </div>
          </motion.div>
        </div>

        {/* Differentiators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 grid sm:grid-cols-3 gap-6"
        >
          {about.differentiators.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <div
                key={index}
                className="group text-center p-6 bg-white dark:bg-verde-900/30 rounded-xl shadow-sm dark:shadow-verde-900/20 hover:shadow-lg dark:hover:shadow-verde-900/40 transition-all duration-300 card-hover"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-verde-100 dark:bg-verde-800/50 flex items-center justify-center group-hover:bg-verde-200 dark:group-hover:bg-verde-700/50 transition-colors">
                  <Icon
                    className="h-7 w-7 text-verde-600 dark:text-verde-400"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-base sm:text-lg font-serif text-gris-800 dark:text-crema-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gris-600 dark:text-crema-300">
                  {item.description}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
