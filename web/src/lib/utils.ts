import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Datos de Jessica Méndez
export const profile = {
  name: "Jessica Viridiana Méndez Gómez",
  shortName: "Jessica Méndez",
  title: "Consultora Ambiental y en Sostenibilidad",
  tagline: "Transformo riesgos ambientales en ventajas competitivas",
  experience: "9+ años",
  email: "contacto@jessicamendez.bio",
  phone: "+52 55 6430 4586",
  website: "jessicamendez.bio",
  linkedin: "https://linkedin.com/in/jessicamendezgomez",
  location: "Ciudad de México, México",
  specialties: ["ESG", "IFC", "Principios de Ecuador", "Regulación Ambiental"],
  sectors: ["Infraestructura", "Energía", "Construcción", "Oil & Gas"],
}

// Trayectoria profesional
export const experience = [
  {
    company: "MEXTYPSA",
    role: "Directora de departamento de Medio Ambiente",
    period: "2024 - Presente",
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
]

// Educación y certificaciones
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

// Servicios
export const services = [
  {
    id: "mia",
    name: "Manifestación de Impacto Ambiental",
    shortName: "MIA",
    description: "Evaluación integral de impactos ambientales para proyectos de desarrollo",
    icon: "FileText",
  },
  {
    id: "esg",
    name: "Consultoría ESG",
    shortName: "ESG",
    description: "Estrategias ambientales, sociales y de gobernanza para inversores",
    icon: "TrendingUp",
  },
  {
    id: "etj",
    name: "Estudios Técnicos Justificativos",
    shortName: "ETJ",
    description: "Cambio de uso de suelo forestal con sustento técnico-legal",
    icon: "Trees",
  },
  {
    id: "social",
    name: "Estudios Sociales",
    shortName: "EVIS",
    description: "Evaluación de impacto social y vinculación con comunidades",
    icon: "Users",
  },
  {
    id: "due-diligence",
    name: "Due Diligence Ambiental",
    shortName: "DD",
    description: "Evaluación de riesgos y pasivos ambientales para transacciones",
    icon: "Search",
  },
  {
    id: "auditorias",
    name: "Auditorías Ambientales",
    shortName: "LAU",
    description: "Verificación de cumplimiento y optimización de procesos",
    icon: "ClipboardCheck",
  },
]
