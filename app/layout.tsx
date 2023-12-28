import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapClient from "./BootstrapClient";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./contexts/AuthContext";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";
import NotesProvider from "./contexts/NotesContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Note",
  description: "This is Note App to save your notes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BootstrapClient />
        <Toaster />
        <AuthProvider>
          <NotesProvider>{children}</NotesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
