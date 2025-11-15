import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: "swap"
})

export const metadata: Metadata = {
  title: "Pringles - DevArt",
  description: "Projeto Pringles - DevArt"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppins.className} antialiased`}
      >
        {children}

        <Script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js" />
        <Script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js" />
        <Script src="https://unpkg.com/split-type" />
      </body>
    </html>
  )
}
