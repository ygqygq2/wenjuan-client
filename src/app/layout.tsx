'use client';

import './styles/globals.css';

import { Providers } from './providers';
import Logo from './components/Logo';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <nav>
            <Logo></Logo>
          </nav>
          {children}
        </Providers>
      </body>
    </html>
  );
}
