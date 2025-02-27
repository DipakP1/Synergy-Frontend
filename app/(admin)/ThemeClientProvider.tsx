"use client";
import { ThemeProvider } from "next-themes";

export function ThemeClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider enableSystem={false} attribute="class" defaultTheme="light">
      {children}
    </ThemeProvider>
  );
}
