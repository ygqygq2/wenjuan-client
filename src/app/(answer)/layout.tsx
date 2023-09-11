import { Providers } from '@/lib/providers';

import '../globals.css';

export const metadata = {
  title: '问卷调查',
  description: '专业的问卷调查系统',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <Providers>
      <body>
        <main style={{ height: `calc(100vh - 65px)` }} className="bg-white">
          <div>{children}</div>
        </main>
        <footer
          className="fixed bottom-0 left-0 w-full h-0.5 text-center bg-[#f7f7f7] border-t
        border-[#e8e8e8] px-10 py-6 text-[14px] text-[rgba(0,0,0,0.88)] align-middle
        flex items-center justify-center"
        >
          ygqygq2 提供技术支持
        </footer>
      </body>
    </Providers>
  </html>
);

export default RootLayout;
