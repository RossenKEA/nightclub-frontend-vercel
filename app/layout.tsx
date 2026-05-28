import ConditionalNavbar from "@/components/ConditionalNavbar";
import Footer from "@/components/Footer";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  icons: { icon: "/images/favicon.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <ConditionalNavbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}