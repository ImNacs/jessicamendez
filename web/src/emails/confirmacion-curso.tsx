import {
  Button,
  Heading,
  Hr,
  Text,
} from '@react-email/components';
import * as React from 'react';
import { BaseEmail } from './base';

interface ConfirmacionCursoEmailProps {
  nombre: string;
  curso: string;
  fecha: string;
  hora?: string;
  accesoUrl: string;
  detalles?: string;
}

export const ConfirmacionCursoEmail = ({
  nombre,
  curso,
  fecha,
  hora,
  accesoUrl,
  detalles,
}: ConfirmacionCursoEmailProps) => (
  <BaseEmail preview={`Confirmación de inscripción: ${curso}`}>
    <Heading style={styles.heading}>
      ¡Inscripción confirmada!
    </Heading>
    <Text style={styles.text}>
      Hola {nombre},
    </Text>
    <Text style={styles.text}>
      Tu inscripción al curso <strong>{curso}</strong> ha sido confirmada exitosamente.
    </Text>
    <Hr style={styles.hr} />
    <table style={styles.table}>
      <tr>
        <td style={styles.label}>Curso:</td>
        <td style={styles.value}>{curso}</td>
      </tr>
      <tr>
        <td style={styles.label}>Fecha:</td>
        <td style={styles.value}>{fecha}</td>
      </tr>
      {hora && (
        <tr>
          <td style={styles.label}>Hora:</td>
          <td style={styles.value}>{hora}</td>
        </tr>
      )}
    </table>
    <Hr style={styles.hr} />
    {detalles && (
      <Text style={styles.text}>{detalles}</Text>
    )}
    <Button href={accesoUrl} style={styles.button}>
      Acceder al curso
    </Button>
    <Text style={styles.note}>
      Guarda este email para tener acceso rápido al curso.
    </Text>
    <Text style={styles.signature}>
      ¡Nos vemos pronto!
      <br />
      <strong>Jessica Méndez</strong>
    </Text>
  </BaseEmail>
);

const styles = {
  heading: {
    color: '#1a1a1a',
    fontSize: '24px',
    fontWeight: '600',
    margin: '0 0 20px',
  },
  text: {
    color: '#333333',
    fontSize: '16px',
    lineHeight: '1.6',
    margin: '0 0 16px',
  },
  hr: {
    borderColor: '#e5e5e5',
    margin: '24px 0',
  },
  table: {
    width: '100%',
  },
  label: {
    color: '#666666',
    fontSize: '14px',
    padding: '8px 16px 8px 0',
    verticalAlign: 'top',
    width: '80px',
  },
  value: {
    color: '#333333',
    fontSize: '16px',
    fontWeight: '500',
    padding: '8px 0',
  },
  button: {
    backgroundColor: '#2d5a45',
    borderRadius: '6px',
    color: '#ffffff',
    display: 'inline-block',
    fontSize: '16px',
    fontWeight: '600',
    margin: '8px 0 24px',
    padding: '14px 28px',
    textDecoration: 'none',
  },
  note: {
    color: '#666666',
    fontSize: '14px',
    fontStyle: 'italic',
    margin: '0 0 24px',
  },
  signature: {
    color: '#333333',
    fontSize: '16px',
    lineHeight: '1.6',
  },
};

export default ConfirmacionCursoEmail;
