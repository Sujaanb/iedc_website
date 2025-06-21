import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Assuming globals.css exists from create-next-app
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "IEDC IEM Salt Lake",
    template: "%s | IEDC IEM Salt Lake", // For page-specific titles
  },
  description: "Innovation and Entrepreneurship Development Cell at IEM Salt Lake, Kolkata. Fostering innovation since 2014.",
  // Add other global metadata like open graph images, keywords etc. if needed
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} flex flex-col min-h-screen bg-slate-50 text-slate-800 antialiased`}>
        <Navbar />
        <main className="flex-grow w-full"> {/* Ensure main takes full width; container is applied per page */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
