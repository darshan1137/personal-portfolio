import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - Darshan Khapekar Portfolio",
  description: "Admin dashboard for managing portfolio content",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
