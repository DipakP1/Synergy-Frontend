"use client";
import { Inter } from "next/font/google";
import "../../globals.css";
import { SnackbarProvider } from "notistack";
import { ThemeClientProvider } from "../ThemeClientProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`dark:bg-black ${inter.className}`}>
        <ThemeClientProvider>
          <SnackbarProvider dense />
          {children}
        </ThemeClientProvider>
      </body>
    </html>
  );
}
