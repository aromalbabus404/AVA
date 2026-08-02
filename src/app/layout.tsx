import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AVA Web Developers — Engineering scalable web ecosystems",
  description: "AVA Web Developers is a Node.js-focused development studio designing high-performance backends and immersive 3D interfaces.",
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
