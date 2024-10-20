"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
const queryClient = new QueryClient();
type QueryClientProviderWrapperProps = {
  children: ReactNode;
};
export function QueryClientProviderWrapper({
  children,
}: QueryClientProviderWrapperProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
