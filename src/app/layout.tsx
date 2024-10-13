import type { Metadata } from "next";
import { QueryClientProviderWrapper } from "./components/query-client-provider-wrapper";
import "./globals.css";

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
