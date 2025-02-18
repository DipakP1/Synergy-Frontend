"use client";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "../../globals.css";
const inter = Inter({ subsets: ["latin"] });
import { SnackbarProvider } from "notistack";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  return (
    <html lang="en">
      <body className={`dark:bg-black ${inter.className}`}>
        <SnackbarProvider dense />
        <ThemeProvider
          enableSystem={false}
          attribute="class"
          defaultTheme="light"
        >
          { children}
        </ThemeProvider>
      </body>
    </html>
  );
}
