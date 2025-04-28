import { SessionProvider } from "next-auth/react";
import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { Inter, Playfair_Display, Space_Grotesk } from "next/font/google";
import { NotificationProvider } from '../components/NotificationSystem';
import type { AppProps } from "next/app";

// Configure fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair-display",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const getLayout = (Component as any).getLayout
    ? (Component as any).getLayout
    : (page: any) => page;
  (page: any) => page;

  return (
    <SessionProvider session={session}>
      <div
        className={`${inter.variable} ${playfairDisplay.variable} ${spaceGrotesk.variable} font-sans`}
      >
        {getLayout(
          <>
            <Layout>
            <NotificationProvider position="top-right" maxNotifications={5}>
              
              <Component {...pageProps} />
              </NotificationProvider>
            </Layout>
          </>
        )}
      </div>
    </SessionProvider>
  );
}
