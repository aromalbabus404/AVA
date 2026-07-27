import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Velorah® — Where dreams rise through the silence",
  description: "We're designing tools for deep thinkers, bold creators, and quiet rebels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full select-none">
      <body className="min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
