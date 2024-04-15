import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner"
import localFont from "next/font/local";

const overusedGrotesk = localFont({
  src: "./fonts/OverusedGrotesk.woff2",
  display: "swap",
});

export const metadata = {
  title: "memorizer-tool",
  description: "A simple tool to help you effectively memorize lots of text",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="p-8">
      <body className={`${overusedGrotesk.className}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
