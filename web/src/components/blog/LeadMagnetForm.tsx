import { useState } from 'react';
import { actions } from 'astro:actions';
import { FileText, Download, Loader2, CheckCircle, AlertCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface LeadMagnetConfig {
  /** Identificador único del recurso */
  id: string;
  /** Etiqueta superior (ej: "Guía gratuita") */
  label: string;
  /** Título del recurso */
  title: string;
  /** Descripción corta */
  description: string;
  /** Lista de beneficios/bullets */
  benefits: string[];
  /** Texto del botón */
  buttonText?: string;
  /** Badge opcional (ej: "+500 descargas") - solo para variante card */
  badge?: string;
}

interface LeadMagnetFormProps {
  /** Configuración del lead magnet */
  config: LeadMagnetConfig;
  /** Variante visual: card (Hero), blog (posts), inline (banners) */
  variant?: 'card' | 'blog' | 'inline';
  className?: string;
}

/** Input de email con icono - reutilizable */
function EmailInput({
  email,
  setEmail,
  disabled,
  className = ''
}: {
  email: string;
  setEmail: (v: string) => void;
  disabled: boolean;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gris-400 dark:text-crema-500 pointer-events-none" />
      <Input
        type="email"
        placeholder="tu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={disabled}
        aria-label="Email para descargar recurso"
        className="pl-10"
      />
    </div>
  );
}

export function LeadMagnetForm({
  config,
  variant = 'card',
  className = '',
}: LeadMagnetFormProps) {
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
      formData.append('type', 'lead');

      const { error } = await actions.subscribe(formData);

      if (error) {
        throw new Error(error.message || 'Error al procesar');
      }

      setStatus('success');
      setEmail('');

      if (typeof window !== 'undefined' && (window as any).umami) {
        (window as any).umami.track('lead_magnet_download', { resource: config.id });
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Error al procesar'
      );
    }
  };

  // ============================================
  // ESTADO DE ÉXITO (todas las variantes)
  // ============================================
  if (status === 'success') {
    return (
      <div className={`relative ${variant === 'card' ? 'max-w-sm mx-auto' : ''} ${className}`}>
        <div className="bg-verde-50 dark:bg-verde-900/30 border-2 border-verde-300 dark:border-verde-700 rounded-2xl p-6 text-center">
          <div className="w-12 h-12 bg-verde-100 dark:bg-verde-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-6 w-6 text-verde-600 dark:text-verde-400" />
          </div>
          <h3 className="font-serif text-lg font-semibold text-gris-900 dark:text-crema-100 mb-2">
            ¡Revisa tu email!
          </h3>
          <p className="text-sm text-gris-600 dark:text-crema-300">
            Te envié el recurso a tu correo. Si no lo ves, revisa spam.
          </p>
        </div>
      </div>
    );
  }

  // ============================================
  // VARIANTE: INLINE (compacta para banners)
  // ============================================
  if (variant === 'inline') {
    return (
      <div className={`p-6 rounded-xl bg-verde-50 dark:bg-verde-900/30 border border-verde-200 dark:border-verde-800 ${className}`}>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex-shrink-0 w-10 h-12 bg-white dark:bg-verde-800 rounded-lg shadow flex flex-col items-center justify-center">
              <FileText className="h-5 w-5 text-verde-600 dark:text-verde-400" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-gris-900 dark:text-crema-100">
                {config.title}
              </h3>
              <p className="text-sm text-gris-600 dark:text-crema-300">
                {config.description}
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 flex-shrink-0">
            <EmailInput
              email={email}
              setEmail={setEmail}
              disabled={status === 'loading'}
              className="w-48"
            />
            <Button
              type="submit"
              disabled={status === 'loading'}
              className="bg-rosa-500 hover:bg-rosa-600 text-white gap-2"
            >
              {status === 'loading' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  {config.buttonText || 'Descargar'}
                </>
              )}
            </Button>
          </form>
        </div>
        {status === 'error' && (
          <p className="mt-2 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
            <AlertCircle className="h-3 w-3 flex-shrink-0" />
            {errorMessage}
          </p>
        )}
      </div>
    );
  }

  // ============================================
  // VARIANTE: BLOG (para posts, estilo integrado)
  // ============================================
  if (variant === 'blog') {
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
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0 w-12 h-14 bg-verde-100 dark:bg-verde-800/50 rounded-lg flex flex-col items-center justify-center">
            <FileText className="h-6 w-6 text-verde-600 dark:text-verde-400" />
            <span className="text-[7px] font-bold text-verde-600 dark:text-verde-400 mt-0.5">PDF</span>
          </div>
          <div>
            <span className="text-xs font-medium text-rosa-500 dark:text-rosa-400 uppercase tracking-wider">
              {config.label}
            </span>
            <h3 className="font-serif text-lg font-semibold text-gris-900 dark:text-crema-100">
              {config.title}
            </h3>
            <p className="text-sm text-gris-600 dark:text-crema-300">
              {config.description}
            </p>
          </div>
        </div>

        {/* Bullets */}
        <ul className="space-y-1.5 mb-4 text-sm">
          {config.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2 text-gris-600 dark:text-crema-300">
              <span className="text-verde-500 mt-0.5">✓</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <EmailInput email={email} setEmail={setEmail} disabled={status === 'loading'} />
          <Button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-rosa-500 hover:bg-rosa-600 dark:bg-rosa-500 dark:hover:bg-rosa-400 text-white gap-2"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                {config.buttonText || 'Descargar gratis'}
              </>
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
          Sin spam. Tu email está seguro.
        </p>
      </div>
    );
  }

  // ============================================
  // VARIANTE: CARD (Hero, destacado con decoración)
  // ============================================
  return (
    <div className={`relative max-w-sm mx-auto ${className}`}>
      {/* Decorative frame */}
      <div
        className="absolute -inset-3 border-2 border-verde-200 dark:border-verde-700 rounded-2xl transform rotate-2"
        aria-hidden="true"
      />

      {/* Card principal */}
      <div className="relative bg-white dark:bg-verde-900/50 rounded-2xl shadow-xl dark:shadow-verde-900/30 overflow-hidden">
        {/* Header visual */}
        <div className="bg-gradient-to-br from-verde-600 to-verde-700 dark:from-verde-700 dark:to-verde-800 p-6 text-white">
          <div className="flex items-start gap-4">
            {/* Mockup del PDF */}
            <div className="flex-shrink-0 w-16 h-20 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center">
              <FileText className="h-8 w-8 text-verde-600" />
              <span className="text-[8px] font-bold text-verde-600 mt-1">PDF</span>
            </div>
            <div>
              <span className="text-verde-200 text-xs font-medium uppercase tracking-wider">
                {config.label}
              </span>
              <h3 className="font-serif text-lg font-semibold leading-tight mt-1">
                {config.title}
              </h3>
              <p className="text-verde-100 text-sm mt-1">
                {config.description}
              </p>
            </div>
          </div>
        </div>

        {/* Contenido del formulario */}
        <div className="p-5">
          {/* Bullets de valor */}
          <ul className="space-y-2 mb-4 text-sm">
            {config.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-gris-600 dark:text-crema-300">
                <span className="text-verde-500 mt-0.5">✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <EmailInput email={email} setEmail={setEmail} disabled={status === 'loading'} />
            <Button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-rosa-500 hover:bg-rosa-600 dark:bg-rosa-500 dark:hover:bg-rosa-400 text-white gap-2"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  {config.buttonText || 'Descargar gratis'}
                </>
              )}
            </Button>
            {status === 'error' && (
              <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                <AlertCircle className="h-3 w-3 flex-shrink-0" />
                {errorMessage}
              </p>
            )}
          </form>

          <p className="mt-3 text-[11px] text-gris-400 dark:text-crema-500 text-center">
            Sin spam · Tu email está seguro
          </p>
        </div>
      </div>

      {/* Badge flotante */}
      {config.badge && (
        <div className="absolute -bottom-3 -right-3 bg-rosa-500 dark:bg-rosa-500 text-white px-4 py-2 rounded-xl shadow-lg">
          <p className="text-xs font-medium">{config.badge}</p>
        </div>
      )}
    </div>
  );
}

export default LeadMagnetForm;
