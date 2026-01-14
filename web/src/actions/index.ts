import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';
import { Resend } from 'resend';
import { BienvenidaEmail } from '../emails/bienvenida';

export const server = {
  subscribe: defineAction({
    accept: 'form',
    input: z.object({
      email: z.string().email('Por favor ingresa un email válido'),
      type: z.enum(['newsletter', 'lead']).default('newsletter'),
    }),
    handler: async ({ email, type }) => {
      const apiKey = process.env.RESEND_API_KEY;
      const audienceId = type === 'lead'
        ? process.env.RESEND_AUDIENCE_LEADS
        : process.env.RESEND_AUDIENCE_NEWSLETTER;

      if (!apiKey || !audienceId) {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Configuración de email no disponible',
        });
      }

      const resend = new Resend(apiKey);

      try {
        await resend.contacts.create({
          email,
          audienceId,
        });

        // Enviar email de bienvenida solo para newsletter
        if (type === 'newsletter') {
          await resend.emails.send({
            from: 'Jessica Méndez <contacto@jessicamendez.bio>',
            to: email,
            subject: '¡Bienvenido/a al Briefing Ambiental!',
            react: BienvenidaEmail({ nombre: 'Suscriptor' }),
          });
        }

        return { success: true };
      } catch (error) {
        // Si el contacto ya existe, lo tratamos como éxito
        if (error instanceof Error && error.message.includes('already exists')) {
          return { success: true };
        }
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error al procesar la suscripción',
        });
      }
    },
  }),
};
