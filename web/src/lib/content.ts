/**
 * Contenido centralizado del sitio
 * Edita este archivo para actualizar cualquier texto del sitio
 */

// =============================================================================
// PERFIL
// =============================================================================

export const profile = {
  name: "Jessica Viridiana Méndez Gómez",
  shortName: "Jessica Méndez",
  title: "Bióloga | Consultora Ambiental y en Sostenibilidad",
  tagline: "Tu aliada en regulación ambiental y financiamiento sostenible",
  experience: "10+ años",
  email: "contacto@jessicamendez.bio",
  phone: "+52 55 6430 4586",
  website: "jessicamendez.bio",
  linkedin: "https://www.linkedin.com/in/jessica-viridiana-m%C3%A9ndez-g%C3%B3mez-3b30371aa/",
  location: "Ciudad de México, México",
}

// =============================================================================
// NAVEGACIÓN
// =============================================================================

export const navigation = {
  main: [
    { href: '#inicio', label: 'Inicio' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#acerca', label: 'Acerca de mí' },
    { href: '#experiencia', label: 'Experiencia' },
  ],
  footer: [
    { href: '/#inicio', label: 'Inicio' },
    { href: '/#servicios', label: 'Servicios' },
    { href: '/#acerca', label: 'Acerca de mí' },
    { href: '/#experiencia', label: 'Experiencia' },
    { href: '/blog/', label: 'Blog' },
    { href: '/#contacto', label: 'Contacto' },
  ],
}

// =============================================================================
// HERO
// =============================================================================

export const hero = {
  badge: "Consultora Ambiental Senior",
  headline: {
    line1: "Tu aliada en",
    line2: "regulación ambiental",
    line3: "y financiamiento sostenible",
  },
  subtitle: "Acompaño a desarrolladores de proyectos y entidades financieras en la obtención de permisos ambientales y cumplimiento de estándares internacionales.",
  cta: {
    primary: "Agenda una consulta",
    secondary: "Ver servicios",
  },
  credentials: [
    "IFC Performance Standards",
    "Principios de Ecuador",
    "SEMARNAT",
  ],
  sectors: [
    { name: "Energía Renovable", icon: "zap" },
    { name: "Infraestructura", icon: "building" },
    { name: "Minería", icon: "mountain" },
    { name: "Oil & Gas", icon: "flame" },
  ],
  sectorsLabel: "Especialista en sectores de alto impacto",
  scrollLabel: "Descubre",
  // Solo el ID, el contenido del lead magnet se administra por separado
  leadMagnetId: "due_diligence_esg",
}

// =============================================================================
// ABOUT
// =============================================================================

export const about = {
  sectionLabel: "Sobre mí",
  description: "Consultora independiente especializada en la gestión ambiental y social de proyectos de infraestructura, energía y minería, con experiencia en México, Centroamérica y República Dominicana.",
  quote: "Combino conocimiento normativo local con estándares internacionales para crear valor sostenible en cada proyecto.",
  experienceBadge: "de experiencia",
  highlights: [
    "Gestión de proyectos ante SEMARNAT y autoridades ambientales",
    "Due diligence para bancos de desarrollo y fondos de inversión",
    "Planes de gestión ambiental y social (PGAS)",
    "Consulta pública y relacionamiento comunitario",
  ],
  differentiators: [
    {
      icon: "Award",
      title: "Experiencia comprobada",
      description: "Track record en proyectos de infraestructura, energía y minería.",
    },
    {
      icon: "Globe",
      title: "Estándares internacionales",
      description: "Dominio de IFC Performance Standards y Principios de Ecuador.",
    },
    {
      icon: "Users",
      title: "Enfoque integral",
      description: "Gestión ambiental y social con visión de financiamiento.",
    },
  ],
}

// =============================================================================
// SERVICIOS
// =============================================================================

export const services = {
  sectionLabel: "Consultoría",
  title: "Servicios Especializados",
  subtitle: "Soluciones integrales desde la factibilidad hasta la operación de tu proyecto",
  cta: {
    text: "¿No encuentras lo que buscas? Ofrezco soluciones personalizadas.",
    button: "Consultar otros servicios",
  },
  items: [
    {
      id: "due-diligence",
      icon: "Search",
      title: "Due Diligence Ambiental y Social",
      shortTitle: "Due Diligence",
      description: "Evaluación de riesgos ESG para transacciones, inversiones y financiamiento de proyectos.",
      details: [
        "Evaluación de pasivos ambientales",
        "Análisis de cumplimiento normativo",
        "Gap analysis vs estándares IFC",
        "Planes de acción correctiva",
      ],
      clients: "Fondos de inversión, bancos, corporativos",
      highlight: true,
    },
    {
      id: "esia",
      icon: "FileText",
      title: "Evaluaciones de Impacto",
      shortTitle: "MIA / ESIA",
      description: "Manifestaciones de Impacto Ambiental y estudios técnicos para autorización de proyectos.",
      details: [
        "MIA Particular y Regional",
        "Estudios Técnicos Justificativos (ETJ)",
        "Evaluación de Impacto Social (EVIS)",
        "Gestión de permisos ante SEMARNAT",
      ],
      clients: "Desarrolladores de proyectos",
      highlight: true,
    },
    {
      id: "ifc",
      icon: "Shield",
      title: "Cumplimiento IFC y Principios de Ecuador",
      shortTitle: "Estándares Internacionales",
      description: "Alineación con estándares de financiamiento internacional para proyectos de inversión.",
      details: [
        "IFC Performance Standards",
        "Principios de Ecuador (EP4)",
        "Planes de Gestión Ambiental y Social",
        "Mecanismos de quejas y reclamos",
      ],
      clients: "Proyectos con financiamiento multilateral",
      highlight: true,
    },
    {
      id: "esg",
      icon: "TrendingUp",
      title: "Consultoría ESG y Sostenibilidad",
      shortTitle: "ESG",
      description: "Estrategias de sostenibilidad corporativa y reportes para inversionistas.",
      details: [
        "Diagnósticos ESG",
        "Estrategias de descarbonización",
        "Reportes de sostenibilidad (GRI, SASB)",
        "Evaluación de riesgos climáticos",
      ],
      clients: "Corporativos, empresas listadas",
      highlight: false,
    },
  ],
}

// =============================================================================
// EXPERIENCIA
// =============================================================================

export const experience = {
  sectionLabel: "Trayectoria",
  title: {
    line1: "Más de una década",
    line2: "transformando proyectos",
  },
  subtitle: "Experiencia en proyectos de alto impacto para el sector privado y financiero",
  timeline: [
    {
      company: "MEXTYPSA",
      role: "Directora de departamento de Medio Ambiente",
      period: "2024 - 2025",
      description: "Liderazgo de proyectos ambientales estratégicos",
    },
    {
      company: "MEXTYPSA",
      role: "Especialista / Supervisora Ambiental",
      period: "2023 - 2024",
      description: "Supervisión y especialización en gestión ambiental",
    },
    {
      company: "EnviroSense",
      role: "Gerente superior de proyecto",
      period: "2016 - 2023",
      description: "Gestión de proyectos ambientales de alto impacto",
    },
  ],
  regions: {
    title: "Alcance Regional",
    description: "Alianzas estratégicas y experiencia liderando equipos multidisciplinarios en proyectos internacionales.",
    items: [
      { name: "México", flag: "🇲🇽", code: "MX" },
      { name: "Centroamérica", flag: "🌎", code: "LATAM" },
      { name: "Rep. Dominicana", flag: "🇩🇴", code: "DO" },
    ],
  },
}

// =============================================================================
// CONTACTO
// =============================================================================

export const contact = {
  sectionLabel: "Contacto",
  title: "Trabajemos Juntos",
  subtitle: "¿Tienes un proyecto que requiere gestión ambiental o cumplimiento de estándares internacionales?",
  cta: {
    email: "Enviar email",
    phone: "Llamar ahora",
  },
  responseTime: {
    title: "Respuesta en menos de 24 horas",
    subtitle: "Para proyectos urgentes, llámame directamente",
  },
  labels: {
    email: "Email",
    phone: "Teléfono",
    linkedin: "LinkedIn",
    linkedinHandle: "jessicamendezgomez",
    location: "Ubicación",
  },
  workWith: "Trabajo con desarrolladores de proyectos, fondos de inversión y bancos de desarrollo en México, Centroamérica y el Caribe.",
}

// =============================================================================
// FOOTER
// =============================================================================

export const footer = {
  tagline: "Tu aliada en regulación ambiental y estrategias de sostenibilidad. Transformando desafíos ambientales en oportunidades de desarrollo sostenible.",
  newsletter: {
    title: "Suscríbete al newsletter",
    description: "Recibe artículos sobre regulación ambiental y sostenibilidad.",
  },
  sections: {
    navigation: "Navegación",
    contact: "Contacto",
  },
  copyright: "Todos los derechos reservados.",
  sustainability: "Comprometida con la sostenibilidad",
}

// =============================================================================
// CREDENCIALES Y EDUCACIÓN
// =============================================================================

export const credentials = [
  {
    name: "Diplomado en Gestión Sostenible",
    institution: "Universitat Carlemany",
    year: "2024-2025",
  },
  {
    name: "Diplomado en Análisis de Información Geoespacial",
    institution: "Centro Geo",
    year: "",
  },
  {
    name: "Legislación Ambiental en México",
    institution: "AENOR",
    type: "Certificación",
    year: "2024",
  },
]
