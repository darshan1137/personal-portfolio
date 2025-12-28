import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login - Darshan Khapekar Portfolio",
  description: "Admin login for portfolio management",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
