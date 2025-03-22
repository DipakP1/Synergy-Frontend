"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Lines from "@/components/Lines";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "../globals.css";
const inter = Inter({ subsets: ["latin"] });

import ToasterContext from "../context/ToastContext";
import { useEffect, useState } from "react";
import { SnackbarProvider } from "notistack";
import Home from "./page";
import ChatBot from "@/components/ChatBot/page";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`dark:bg-black ${inter.className}`}>
        <ThemeProvider
          enableSystem={false}
          attribute="class"
          defaultTheme="light"
        >
          <SnackbarProvider dense />
          <Lines />
          <Header />
          <ToasterContext />
          {children}
          <Footer />
          {/* <ChatBot /> */}
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
