"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const aboutData = [
  {
    title: "Computer Engineering Student - VESIT",
    image: "/vesit.jpg",
    points: [
      "Pursuing Bachelor of Engineering from Vivekanand Education Society's Institute of Technology, Mumbai",
      "Current CGPA: 9.66 (till Semester 6)",

      "IEEE VESIT Second Year Coordinator - Led technical events and workshops",
    ],
  },
  {
    title: "Founder and Team Lead - Coding Gurus",
    image: "/coding.jpg",
    points: [
      "Founded tech collective focused on building innovative solutions and mentoring students",
      "Leading team of 10+ developers and designers",
      "7x Hackathon Winner - SIH 2024, SIH 2025, Mumbai Hacks 2025, Rotacodefest 2024, KakushuIN 9.0, CodeCrafters 2.0, Technothon 2023",
      "Participated in 15+ State and National Hackathons",
    ],
  },
  {
    title: "Educator - V2V EdTech LLP & Excellent Tutorials",
    image: "/v2v.jpg",
    points: [
      "Teaching Mobile App Development and Full Stack Development courses",
      "Mentored 500+ students in various technical subjects",
      "Conducting lectures for Diploma, BSC, and Commerce IT students",
      "Training and supervising tech teams on modern development practices",
    ],
  },
];

export default function AboutMe() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50 py-16 md:py-20 text-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          About Me
        </motion.h2>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {aboutData.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`flex flex-col ${
                idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-6 md:gap-8 lg:gap-12 pb-8 ${
                idx !== aboutData.length - 1 ? "border-b border-gray-200" : ""
              }`}
            >
              {/* Image */}
              <motion.div
                className="w-full md:w-5/12 lg:w-2/5 flex justify-center"
                whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 2 : -2 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="relative rounded-lg shadow-xl object-cover w-full h-auto hover-lift"
                    priority={idx === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  />
                </div>
              </motion.div>

              {/* Content */}
              <div className="w-full md:w-7/12 lg:w-3/5">
                <motion.h3
                  whileHover={{ x: 5 }}
                  className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800"
                >
                  {item.title}
                </motion.h3>
                <ul className="space-y-3 md:space-y-4">
                  {item.points.map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-3 text-sm md:text-base text-gray-600 group cursor-pointer"
                    >
                      <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <span className="group-hover:text-gray-800 transition-colors">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
