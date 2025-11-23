import type { Metadata } from "next";
import { Noto_Serif_SC, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";

// 配置字体
const notoSerif = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
  display: "swap",
});

const notoSans = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "诗云 Poetry Cloud",
  description: "寻觅中国诗词之美",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${notoSerif.variable} ${notoSans.variable}`}>
      <head>
        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-S4005KV8C5"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-S4005KV8C5');
            `,
          }}
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col">
        <AuthProvider>
          {/* 1. 导航栏 */}
          <Navigation />
          
          {/* 2. 页面主体 */}
          <div className="flex-grow">
            {children}
          </div>
          
          {/* 3. 页脚 */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}