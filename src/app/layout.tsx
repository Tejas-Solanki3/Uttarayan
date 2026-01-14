import type { Metadata } from 'next';
import './globals.css';
import LenisProvider from '@/components/providers/lenis-provider';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Uttarayan: A Digital Celebration',
  description: 'An immersive, animated festival website for Makar Sankranti.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <LenisProvider>{children}</LenisProvider>
        <Toaster />
      </body>
    </html>
  );
}
