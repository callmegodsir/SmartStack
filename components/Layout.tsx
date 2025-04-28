import "react-tooltip/dist/react-tooltip.css";
import { ReactNode, useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";

import { Tooltip } from "react-tooltip";
import ErrorBoundary from "./ErrorBoundary";
import config from "@/config";

const font = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data } = useSession();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    // Most errors are catched in ErrorBondary to show a nice error page
    <ErrorBoundary>
      <style jsx global>{`
        html {
          font-family: ${font.style.fontFamily};
        }
      `}</style>
      {/* Automatically show a progress bar at the top when navigating between pages */}
      <NextNProgress
        color='gray-800'
        options={{ showSpinner: false }}
      />
      {children}
      {/* Show Success/Error messages anywhere from the app with toast() */}
      {isMounted && (
        <Toaster
          toastOptions={{
            duration: 3000,
          }}
        />
      )}
      {/* Show tooltips if any JSX elements has these 2 attributes: data-tooltip-id="tooltip" data-tooltip-content="" */}
      <Tooltip id="tooltip" className="z-[60] !opacity-100 max-w-sm" />
    </ErrorBoundary>
  );
}
