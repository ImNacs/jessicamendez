import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface BaseEmailProps {
  preview?: string;
  children: React.ReactNode;
}

export const BaseEmail = ({ preview, children }: BaseEmailProps) => (
  <Html>
    <Head />
    {preview && <Preview>{preview}</Preview>}
    <Body style={styles.body}>
      <Container style={styles.container}>
        <Section style={styles.header}>
          <Img
            src="https://jessicamendez.bio/logo.png"
            width="150"
            height="40"
            alt="Jessica Méndez"
            style={styles.logo}
          />
        </Section>
        <Section style={styles.content}>{children}</Section>
        <Section style={styles.footer}>
          <Text style={styles.footerText}>
            Jessica Méndez | Consultora Ambiental
          </Text>
          <Text style={styles.footerLinks}>
            <Link href="https://jessicamendez.bio" style={styles.link}>
              Web
            </Link>
            {' · '}
            <Link href="https://linkedin.com/in/jessicamendez" style={styles.link}>
              LinkedIn
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const styles = {
  body: {
    backgroundColor: '#f5f5f5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    margin: 0,
    padding: '20px 0',
  },
  container: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    margin: '0 auto',
    maxWidth: '600px',
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#2d5a45',
    padding: '30px',
    textAlign: 'center' as const,
  },
  logo: {
    margin: '0 auto',
  },
  content: {
    padding: '40px 30px',
  },
  footer: {
    backgroundColor: '#f9f9f9',
    padding: '20px 30px',
    textAlign: 'center' as const,
  },
  footerText: {
    color: '#666666',
    fontSize: '12px',
    margin: '0 0 8px',
  },
  footerLinks: {
    color: '#666666',
    fontSize: '12px',
    margin: 0,
  },
  link: {
    color: '#2d5a45',
    textDecoration: 'none',
  },
};

export default BaseEmail;
