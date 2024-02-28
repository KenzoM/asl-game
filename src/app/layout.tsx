import type { Metadata } from "next";
import "./globals.css";
import NextUIProvider from "@/providers/nextUIProvider";
import NavbarUI from "@/components/NavBarUI";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="p-5">
        <NextUIProvider>
          <NavbarUI />
          {children}
          <footer className="flex text-white justify-center">
            <p>Copyright &copy; 2024 ASL Game</p>
          </footer>
        </NextUIProvider>
      </body>
    </html>
  );
}
