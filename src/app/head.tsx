export default function Head() {
  return (
    <>
      <link rel="canonical" href="https://darshankhapekar.com" />
      <meta name="google-site-verification" content="your-google-verification-code" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Darshan Vishnu Khapekar",
            url: "https://darshankhapekar.com",
            jobTitle: "Full Stack Developer",
            worksFor: [
              {
                "@type": "Organization",
                name: "Coding Gurus",
                url: "https://codinggurus.in",
              },
              {
                "@type": "EducationalOrganization",
                name: "VES Institute of Technology",
              },
              {
                "@type": "Organization",
                name: "V2V EdTech LLP",
              },
            ],
            knowsAbout: [
              "Full Stack Development",
              "React",
              "Next.js",
              "Node.js",
              "Python",
              "AI/ML",
              "Mobile Development",
              "Web Development",
            ],
            alumniOf: [
              {
                "@type": "CollegeOrUniversity",
                name: "VES Institute of Technology",
              },
              {
                "@type": "EducationalOrganization",
                name: "Vidyalankar Polytechnic",
              },
            ],
            sameAs: [
              "https://www.linkedin.com/in/darshankhapekar/",
              "https://github.com/darshankhapekar",
            ],
            description:
              "Full Stack Developer, 7x Hackathon Winner, Founder of Coding Gurus tech collective, Educator at VESIT",
          }),
        }}
      />
    </>
  );
}
