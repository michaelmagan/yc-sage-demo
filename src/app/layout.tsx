import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"
import { Header } from "@/components/Header"
import { ThemeProvider } from "@/components/theme-provider"

import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Trestle - Demo",
  description:
    "Trestle provides identity data APIs to help businesses maximize customer contactability, identification and efficiency.",
  openGraph: {
    title: "Trestle - Generative UI Demo",
    description:
      "Identity data for seamless customer connections. Start a Free Trial to explore our featured products.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <head />
      <body className={cn("h-full bg-background font-sans antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1 overflow-hidden">{children}</main>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
