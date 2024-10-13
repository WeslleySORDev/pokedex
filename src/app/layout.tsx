import type { Metadata } from "next";
import "./globals.css";
import { QueryClientProviderWrapper } from "./components/query-client-provider-wrapper";

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
      <body>
        <QueryClientProviderWrapper>{children}</QueryClientProviderWrapper>
      </body>
    </html>
  );
}
