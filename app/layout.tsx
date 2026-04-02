import type { Metadata } from 'next';
import { GeistMono } from 'geist/font/mono';
import { AudioProvider } from '@/providers/AudioProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shuga — Portfolio',
  description: 'Personal portfolio of Shuga. PS2 system menu aesthetic.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistMono.variable} h-full`}
      style={{ fontFamily: GeistMono.style.fontFamily }}
    >
      <body className="h-full overflow-hidden">
        <AudioProvider>{children}</AudioProvider>
      </body>
    </html>
  );
}
