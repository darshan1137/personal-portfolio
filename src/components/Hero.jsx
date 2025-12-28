"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Hero() {
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
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section className="relative w-full h-[75vh] md:h-[85vh] lg:h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Animated Background with Parallax Effect */}
      <motion.div
        className="absolute inset-0 bg-black overflow-hidden z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src="/bg.png"
          alt="Background Collage"
          fill
          className="object-cover animate-zoom-pan"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </motion.div>

      {/* Main Content with Stagger Animation */}
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-10 flex flex-col items-center text-center space-y-4 md:space-y-6 px-4 max-w-4xl"
      >
        {/* Profile Image with Scale Animation */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05, rotate: 2 }}
          className="w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 md:border-5 border-white shadow-2xl bg-white hover-glow"
        >
          <Image
            src="/darshan.jpg"
            alt="Darshan Khapekar"
            width={300}
            height={300}
            className="object-contain w-full h-full"
            priority
            quality={90}
            sizes="(max-width: 768px) 160px, (max-width: 1024px) 224px, 256px"
          />
        </motion.div>

        {/* Name & Title with Stagger Effects */}
        <motion.div variants={itemVariants} className="text-white space-y-2 md:space-y-3">
          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.02 }}
          >
            Darshan Khapekar
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-xl lg:text-2xl text-gray-200 font-semibold"
          >
            Full Stack Developer | AI & ML Enthusiast
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="space-y-1 md:space-y-2 text-sm md:text-base lg:text-lg text-gray-300"
          >
            <p className="flex items-center justify-center gap-2">
              <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
              7x Hackathon Winner • 15+ Hackathon Participations
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              CGPA 9.66 • Founder @Coding Gurus • Tech Educator
            </p>
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mt-6">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(99, 102, 241, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-sm md:text-base shadow-lg transition-all duration-300"
          >
            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255, 255, 255, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent border-2 border-white text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-sm md:text-base shadow-lg hover:bg-white hover:text-black transition-all duration-300"
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden md:block"
      >
        <div className="flex flex-col items-center text-white">
          <span className="text-sm mb-2">Scroll Down</span>
          <svg
            className="w-6 h-6 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
