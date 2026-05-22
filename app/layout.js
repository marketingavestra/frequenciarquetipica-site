import { Cinzel, EB_Garamond, Inter } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
});

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-garamond',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Descubra Seu Arquétipo Dominante — Frequência Arquetípica',
  description:
    'Um quiz de 8 perguntas revela o arquétipo que governa sua identidade, sua sombra e a frequência que está bloqueando sua expansão.',
  openGraph: {
    title: 'Qual Arquétipo Está Governando a Sua Vida?',
    description: 'Descubra em 3 minutos. Resultado gratuito pelo WhatsApp.',
    url: 'https://frequenciarquetipica.site',
    siteName: 'Frequência Arquetípica',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`${cinzel.variable} ${ebGaramond.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}