import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import { WalletProvider } from "@/providers/wallet-provider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Toll Payment App',
  description: 'Pay toll tax with the help of blockchains',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          <main className="flex flex-col w-screen h-screen items-center px-24 py-20">
            <Navbar />
            {children}
            <Footer />
          </main>
        </WalletProvider>
      </body>
    </html>
  );
}
