import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { QueryProvider } from "@/client/_app/providers";
import "./globals.css";
import { Header } from "@/client/widgets";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Explorador Pokédex - Arquitetura FSD",
  description:
    "Aplicação de listagem de Pokémons utilizando a arquitetura Feature-Sliced Design",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-zinc-100/50 to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans">
          <Header />

          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 flex flex-col gap-6 mb-8">
            <QueryProvider>{children}</QueryProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
