import type { Metadata } from "next";
import RootAppLayout from "./RootAppLayout";

import "react-perfect-scrollbar/dist/css/styles.css";
import "@ant-design/v5-patch-for-react-19";
import "./globals.css";

export const metadata: Metadata = {
  title: "Indonesia Crypto Network",
  description: "Indonesia Crypto Network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RootAppLayout>{children}</RootAppLayout>
      </body>
    </html>
  );
}
