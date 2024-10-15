import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Header } from "./components/header";
import { QueryClientProviderWrapper } from "./components/query-client-provider-wrapper";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Pokedex",
  description: "Um aplicativo de pokedex feito para estudar performance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <QueryClientProviderWrapper>
          <Header />
          {children}
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
