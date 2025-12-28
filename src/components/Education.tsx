"use client";

import { GraduationCap, School, BookOpen } from "lucide-react";
import { JSX } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { Variants } from "framer-motion";

interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  description?: string;
  points?: string[];
  icon: JSX.Element;
}

const educationData: EducationItem[] = [
  {
    degree: "Bachelor of Engineering in Computer Engineering",
    institution: "VES Institute of Technology, Chembur",
    year: "2023 - 2026",
    points: [
      "Current CGPA: 9.66 (till Semester 6)",
      "7x Hackathon Winner - SIH 2024, SIH 2025, Mumbai Hacks 2025, and more",
      "Participated in 15+ Hackathons nationwide",
      "IEEE VESIT Second Year Coordinator - Led technical events and projects",
      "Specializing in AI/ML, Full Stack Development, and Mobile Apps",
    ],
    icon: <GraduationCap className="w-12 h-12 text-indigo-600" />,
  },
  {
    degree: "Diploma in Information Technology",
    institution: "Vidyalankar Polytechnic, Wadala",
    year: "2020 - 2023",
    points: [
      "Graduated with 90% in Semester 5 and 91.57% in Semester 6",
      "Technical Head of IT Program - Organized seminars and events",
      "Led Web3, Mobile Apps, and Development Club initiatives",
      "Participated in inter-college technical exhibitions",
    ],
    icon: <BookOpen className="w-12 h-12 text-emerald-600" />,
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "St. Thomas High School",
    year: "2020",
    points: [
      "Achieved 87% overall with 98% in Mathematics",
      "Strong foundation in STEM subjects",
      "Active participant in cultural and sports events",
    ],
    icon: <School className="w-12 h-12 text-purple-600" />,
  },
];

export default function Education() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section
      id="education"
      className="w-full bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 text-gray-900 dark:text-white py-16 md:py-20"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          Education
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-slate-600 dark:text-slate-400 mb-12 md:mb-16 max-w-2xl mx-auto text-base md:text-lg"
        >
          Academic journey from mathematics excellence to specializing in Computer Engineering
        </motion.p>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row md:justify-between gap-6 lg:gap-8"
        >
          {educationData.map((edu, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 flex-1 border border-indigo-100 dark:border-slate-700 group relative overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <motion.div
                  className="flex justify-center mb-6"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  {edu.icon}
                </motion.div>
                <h3 className="text-lg md:text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {edu.degree}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2 font-semibold text-sm md:text-base">
                  {edu.institution}
                </p>
                <p className="text-indigo-600 dark:text-indigo-400 text-xs md:text-sm mb-6 font-bold inline-block px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 rounded-full">
                  {edu.year}
                </p>

                {edu.description && (
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{edu.description}</p>
                )}

                {edu.points && (
                  <ul className="text-left text-gray-600 dark:text-gray-300 space-y-3 mt-6">
                    {edu.points.map((point, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 text-sm md:text-base"
                      >
                        <span className="text-indigo-500 dark:text-indigo-400 mt-0.5 font-bold text-lg flex-shrink-0">
                          ✓
                        </span>
                        <span className="leading-relaxed">{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
