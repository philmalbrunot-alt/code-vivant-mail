import './globals.css';
import type { Metadata } from 'next';
import MetaPixel from '@/components/MetaPixel';

export const metadata: Metadata = {
  title: 'Code Vivant',
  description: 'Diagnostic intérieur premium',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <MetaPixel />
        {children}
      </body>
