import type { ReactNode } from 'react';
import TopNav    from './TopNav';
import FooterHUD from './FooterHUD';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div id="app-shell">
      <TopNav />
      <main id="main-content" style={{ paddingBottom: '72px' }}>
        {children}
      </main>
      <FooterHUD />
    </div>
  );
}
