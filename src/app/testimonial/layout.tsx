import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Share Your Testimonial - Darshan Khapekar",
  description: "Share your experience working with Darshan Khapekar. Your feedback is valuable!",
};

export default function TestimonialLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
