import { QueryProvider } from "./QueryProvider";

export function AllProviders({ children }: { children: React.ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
