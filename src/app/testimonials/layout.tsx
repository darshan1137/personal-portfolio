import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials - Darshan Khapekar",
  description:
    "Read testimonials from clients, colleagues, and students who have worked with Darshan Khapekar. See what people say about collaboration and projects.",
  keywords: [
    "testimonials",
    "reviews",
    "client feedback",
    "Darshan Khapekar reviews",
    "work experience",
  ],
};

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
