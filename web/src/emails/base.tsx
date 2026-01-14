import {
  Body,
  Container,
  Head,
  Html,
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
          <table cellPadding="0" cellSpacing="0" style={{ margin: '0 auto' }}>
            <tr>
              <td style={styles.leafCell}>
                {/* Hoja SVG */}
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#e8a4b8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
              </td>
              <td style={styles.brandName}>Jessica</td>
              <td style={styles.brandSurname}>Méndez</td>
            </tr>
          </table>
        </Section>
        <Section style={styles.content}>{children}</Section>
        <Section style={styles.footer}>
          <Text style={styles.footerText}>
            Jessica Méndez | Bióloga · Consultora en impacto ambiental y sostenibilidad
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
  leafCell: {
    paddingRight: '10px',
    verticalAlign: 'middle' as const,
  },
  brandName: {
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontSize: '24px',
    fontWeight: '400' as const,
    color: '#f5f0e8',
    paddingRight: '6px',
    verticalAlign: 'middle' as const,
  },
  brandSurname: {
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontSize: '24px',
    fontWeight: '400' as const,
    color: '#f5f0e8',
    verticalAlign: 'middle' as const,
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
