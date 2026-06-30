import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CleanDesk AI",
  description: "Mobile-first operations prototype for residential cleaners"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
