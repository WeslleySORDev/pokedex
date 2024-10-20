import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { QueryClientProviderWrapper } from "@/components/query-client-provider-wrapper";

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
        <QueryClientProviderWrapper>{children}</QueryClientProviderWrapper>
      </body>
    </html>
  );
}
