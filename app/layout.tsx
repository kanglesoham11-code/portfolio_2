import type { Metadata, Viewport } from "next";
import "./globals.css";
import "devicon/devicon.min.css";

export const metadata: Metadata = {
  title: "Soham Kangle — Systems Engineer",
  description:
    "Building distributed, multi-tiered backend services and AI-powered platforms. Portfolio of Soham Kangle.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
