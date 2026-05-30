import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
      import { Bangers } from 'next/font/google';
      const bangers = Bangers({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bangers',
});

export const metadata: Metadata = {
  title: 'Teddy Battles — London Street Legends',
  description: 'Connect your wallet. Pick your Teddy. Battle for the streets.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">

      <body className={bangers.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
