import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';
import { Resend } from 'resend';

export const server = {
  subscribe: defineAction({
    accept: 'form',
    input: z.object({
      email: z.string().email('Por favor ingresa un email válido'),
    }),
    handler: async ({ email }) => {
      const apiKey = import.meta.env.RESEND_API_KEY;
      const audienceId = import.meta.env.RESEND_AUDIENCE_ID;

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
