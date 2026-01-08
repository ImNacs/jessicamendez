import {
  Button,
  Heading,
  Text,
} from '@react-email/components';
import * as React from 'react';
import { BaseEmail } from './base';

interface BienvenidaEmailProps {
  nombre: string;
}

export const BienvenidaEmail = ({ nombre }: BienvenidaEmailProps) => (
  <BaseEmail preview={`Bienvenido/a ${nombre} a nuestra comunidad`}>
    <Heading style={styles.heading}>
      ¡Bienvenido/a, {nombre}!
    </Heading>
    <Text style={styles.text}>
      Gracias por unirte a nuestra comunidad de profesionales comprometidos con la sostenibilidad y el desarrollo responsable.
    </Text>
    <Text style={styles.text}>
      A partir de ahora recibirás contenido exclusivo sobre:
    </Text>
    <ul style={styles.list}>
      <li>Normativas ESG y su aplicación práctica</li>
      <li>Estándares IFC y casos de estudio</li>
      <li>Tendencias en consultoría ambiental</li>
      <li>Invitaciones a webinars y cursos</li>
    </ul>
    <Button href="https://jessicamendez.bio/blog" style={styles.button}>
      Explorar el blog
    </Button>
    <Text style={styles.signature}>
      Un saludo,
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
  list: {
    color: '#333333',
    fontSize: '16px',
    lineHeight: '1.8',
    margin: '0 0 24px',
    paddingLeft: '20px',
  },
  button: {
    backgroundColor: '#2d5a45',
    borderRadius: '6px',
    color: '#ffffff',
    display: 'inline-block',
    fontSize: '16px',
    fontWeight: '600',
    padding: '14px 28px',
    textDecoration: 'none',
  },
  signature: {
    color: '#333333',
    fontSize: '16px',
    lineHeight: '1.6',
    marginTop: '32px',
  },
};

export default BienvenidaEmail;
