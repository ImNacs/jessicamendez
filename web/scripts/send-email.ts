#!/usr/bin/env bun
/**
 * Script CLI para enviar emails via Resend
 *
 * Uso:
 *   bun scripts/send-email.ts --to email@ejemplo.com --template bienvenida --data '{"nombre":"Juan"}'
 *   bun scripts/send-email.ts --to email@ejemplo.com --template confirmacion-curso --data '{"nombre":"Juan","curso":"ESG","fecha":"15 Feb","accesoUrl":"https://..."}'
 */

// Cargar variables de entorno desde la raíz del proyecto
import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '../../.env.local') });

import { Resend } from 'resend';
import { parseArgs } from 'util';
import { BienvenidaEmail } from '../src/emails/bienvenida';
import { ConfirmacionCursoEmail } from '../src/emails/confirmacion-curso';

const resend = new Resend(process.env.RESEND_API_KEY);

const templates: Record<string, { component: any; defaultSubject: string }> = {
  bienvenida: {
    component: BienvenidaEmail,
    defaultSubject: '¡Bienvenido/a a la comunidad de Jessica Méndez!',
  },
  'confirmacion-curso': {
    component: ConfirmacionCursoEmail,
    defaultSubject: 'Confirmación de inscripción',
  },
};

async function main() {
  const { values } = parseArgs({
    args: process.argv.slice(2),
    options: {
      to: { type: 'string' },
      template: { type: 'string' },
      subject: { type: 'string' },
      data: { type: 'string' },
      from: { type: 'string', default: 'Jessica Méndez <contacto@jessicamendez.bio>' },
      list: { type: 'boolean', default: false },
    },
  });

  // Listar templates disponibles
  if (values.list) {
    console.log('\nTemplates disponibles:');
    console.log('─'.repeat(50));
    Object.keys(templates).forEach((name) => {
      console.log(`  - ${name}`);
    });
    console.log('\nUso:');
    console.log('  bun scripts/send-email.ts --to email@ejemplo.com --template <nombre> --data \'{"key":"value"}\'');
    process.exit(0);
  }

  // Validar parámetros
  if (!values.to) {
    console.error('Error: --to es requerido');
    process.exit(1);
  }

  if (!values.template) {
    console.error('Error: --template es requerido');
    console.log('Usa --list para ver templates disponibles');
    process.exit(1);
  }

  const templateConfig = templates[values.template];
  if (!templateConfig) {
    console.error(`Error: Template "${values.template}" no encontrado`);
    console.log('Usa --list para ver templates disponibles');
    process.exit(1);
  }

  // Parsear datos
  let data = {};
  if (values.data) {
    try {
      data = JSON.parse(values.data);
    } catch {
      console.error('Error: --data debe ser JSON válido');
      process.exit(1);
    }
  }

  // Crear componente de email
  const EmailComponent = templateConfig.component;
  const subject = values.subject || templateConfig.defaultSubject;

  console.log(`\nEnviando email...`);
  console.log(`  To: ${values.to}`);
  console.log(`  Template: ${values.template}`);
  console.log(`  Subject: ${subject}`);
  console.log(`  Data: ${JSON.stringify(data)}`);

  try {
    const { data: result, error } = await resend.emails.send({
      from: values.from!,
      to: values.to,
      subject,
      react: EmailComponent(data),
    });

    if (error) {
      console.error('\nError:', error);
      process.exit(1);
    }

    console.log('\n✅ Email enviado exitosamente');
    console.log(`   ID: ${result?.id}`);
  } catch (error) {
    console.error('\nError:', error);
    process.exit(1);
  }
}

main();
