import { useState } from 'react';
import { actions } from 'astro:actions';
import { Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface NewsletterFormProps {
  variant?: 'inline' | 'card';
  className?: string;
}

export function NewsletterForm({
  variant = 'card',
  className = '',
}: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Por favor ingresa un email válido');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('email', email);

      const { error } = await actions.subscribe(formData);

      if (error) {
        throw new Error(error.message || 'Error al suscribirse');
      }

      setStatus('success');
      setEmail('');

      if (typeof window !== 'undefined' && (window as any).umami) {
        (window as any).umami.track('newsletter_subscribe');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Error al procesar la suscripción'
      );
    }
  };

  if (status === 'success') {
    return (
      <div className={`${variant === 'card' ? 'p-6 rounded-xl border border-verde-200 dark:border-verde-800' : ''} bg-verde-50 dark:bg-verde-900/20 ${className}`}>
        <div className="flex items-center gap-3 text-verde-700 dark:text-verde-300">
          <CheckCircle className="h-5 w-5 flex-shrink-0" />
          <div>
            <p className="font-medium">¡Gracias por unirte!</p>
            <p className="text-sm text-verde-600 dark:text-verde-400">
              Recibirás el próximo briefing de sostenibilidad.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Variante inline - footer
  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className={`relative ${className}`}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gris-400" />
            <Input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              disabled={status === 'loading'}
              aria-label="Email para newsletter"
            />
          </div>
          <Button
            type="submit"
            disabled={status === 'loading'}
            className="bg-verde-600 hover:bg-verde-700 text-white"
          >
            {status === 'loading' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Suscribirse'
            )}
          </Button>
        </div>
        {status === 'error' && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errorMessage}
          </p>
        )}
      </form>
    );
  }

  // Variante card - blog posts
  return (
    <div
      className={`
        p-6 rounded-xl
        bg-crema-50 dark:bg-verde-900/30
        border border-verde-200 dark:border-verde-800
        hover:border-verde-300 dark:hover:border-verde-700
        transition-colors duration-300
        ${className}
      `}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="p-2 bg-verde-100 dark:bg-verde-800/50 rounded-lg">
          <Mail className="h-5 w-5 text-verde-600 dark:text-verde-400" />
        </div>
        <div>
          <h3 className="font-serif text-lg font-semibold text-gris-900 dark:text-crema-100">
            Briefing Ambiental Semanal
          </h3>
          <p className="text-sm text-gris-600 dark:text-crema-300">
            Regulación ESG, IFC y tendencias de sostenibilidad.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          aria-label="Email para newsletter"
        />
        <Button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-verde-600 hover:bg-verde-700 text-white"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Procesando...
            </>
          ) : (
            'Recibir briefing gratis'
          )}
        </Button>
        {status === 'error' && (
          <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {errorMessage}
          </p>
        )}
      </form>

      <p className="mt-3 text-xs text-gris-500 dark:text-crema-400 text-center">
        Sin spam. Cancela cuando quieras.
      </p>
    </div>
  );
}

export default NewsletterForm;
