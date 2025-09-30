import { ClerkProvider } from "@/components/providers/clerk-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { brand } from "@/lib/constants/brand";
import LenisWrapper from "@/components/marketing/lenis-wrapper";
import ConvexClientProvider from "@/components/providers/convex-client-provider";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: brand.name,
  description: brand.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <ConvexClientProvider>
        <html lang="en" className="h-full" suppressHydrationWarning>
          <head>
            <script
              async
              src="https://scripts.simpleanalyticscdn.com/latest.js"
            ></script>
          </head>
          <body className={`${interSans.variable} antialiased`}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <LenisWrapper>
                <div className="flex flex-col min-h-screen">{children}</div>
              </LenisWrapper>
            </ThemeProvider>
          </body>
        </html>
      </ConvexClientProvider>
    </ClerkProvider>
  );
}
