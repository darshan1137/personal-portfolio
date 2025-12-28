import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Darshan Khapekar - Full Stack Developer | AI & ML Enthusiast | VESIT Mumbai",
  description:
    "Darshan Vishnu Khapekar - 7x Hackathon Winner (SIH 2024, SIH 2025, Mumbai Hacks 2025, Rotacodefest 2024, Technothon 2023), Full Stack Developer with 9.66 CGPA, Founder of Coding Gurus tech collective, Educator at VESIT & V2V EdTech. Expert in React, Next.js, Node.js, Python, AI/ML. 15+ Hackathon Participations. Based in Mumbai, India.",
  keywords: [
    "Darshan Khapekar",
    "Darshan Vishnu Khapekar",
    "Full Stack Developer Mumbai",
    "Coding Gurus",
    "Coding Gurus Founder",
    "VESIT",
    "VES Institute of Technology",
    "VESIT Computer Engineering",
    "Hackathon Winner",
    "Hackathon Winner India",
    "7x Hackathon Winner",
    "AI ML Developer",
    "Machine Learning Engineer",
    "React Developer Mumbai",
    "Next.js Developer",
    "Node.js Developer",
    "Python Developer",
    "Web Developer Mumbai",
    "Mobile App Developer",
    "Tech Educator",
    "Tech Educator Mumbai",
    "V2V EdTech",
    "V2V EdTech Educator",
    "IEEE VESIT",
    "IEEE VESIT Coordinator",
    "Vidyalankar Polytechnic",
    "Internshala Student Partner",
    "SoftScribble Developer",
    "Excellent Tutorials",
    "Portfolio Website",
    "Software Engineer Mumbai",
    "Freelance Developer Mumbai",
    "Tech Solutions Mumbai",
    "API Development",
    "Database Management",
    "Firebase Developer",
    "MongoDB Developer",
    "TypeScript Developer",
    "Tailwind CSS",
    "Chembur Mumbai",
    "Kalyan Maharashtra",
  ],
  authors: [{ name: "Darshan Vishnu Khapekar" }],
  creator: "Darshan Khapekar",
  publisher: "Darshan Khapekar",
  openGraph: {
    title: "Darshan Khapekar - Full Stack Developer | Founder Coding Gurus | VESIT",
    description:
      "7x Hackathon Winner (SIH 2024, SIH 2025, Mumbai Hacks 2025), CGPA 9.66, Tech Educator at VESIT & V2V EdTech, Full Stack Developer building innovative solutions. Founder of Coding Gurus. 15+ Hackathon Participations. Expert in React, Node.js, Python, AI/ML.",
    type: "website",
    locale: "en_US",
    url: "https://darshankhapekar.com",
    siteName: "Darshan Khapekar Portfolio",
    images: [
      {
        url: "/darshan.jpg",
        width: 1200,
        height: 630,
        alt: "Darshan Khapekar - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Darshan Khapekar - Full Stack Developer",
    description:
      "7x Hackathon Winner (SIH 2025, Mumbai Hacks 2025) | 15+ Hackathons | CGPA 9.66 | Founder Coding Gurus | Tech Educator VESIT",
    images: ["/darshan.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://darshankhapekar.com",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://firebasestorage.googleapis.com" />
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
