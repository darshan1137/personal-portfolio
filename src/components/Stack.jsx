"use client";

import {
  FaReact,
  FaPython,
  FaNodeJs,
  FaDatabase,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaJava,
} from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiMysql, SiFirebase } from "react-icons/si";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const techStack = [
  { name: "React JS", icon: <FaReact size={40} className="text-blue-500" /> },
  { name: "Next JS", icon: <SiNextdotjs size={40} /> },
  { name: "Python", icon: <FaPython size={40} className="text-yellow-500" /> },
  { name: "Node JS", icon: <FaNodeJs size={40} className="text-green-500" /> },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss size={40} className="text-cyan-400" />,
  },
  { name: "MongoDB", icon: <SiMongodb size={40} className="text-green-600" /> },
  { name: "MySQL", icon: <SiMysql size={40} className="text-blue-600" /> },
  {
    name: "Firebase",
    icon: <SiFirebase size={40} className="text-yellow-400" />,
  },
  { name: "HTML", icon: <FaHtml5 size={40} className="text-orange-500" /> },
  { name: "CSS", icon: <FaCss3Alt size={40} className="text-blue-400" /> },
  {
    name: "JavaScript",
    icon: <FaJsSquare size={40} className="text-yellow-300" />,
  },
  { name: "Java", icon: <FaJava size={40} className="text-red-500" /> },
];

export default function TechStackIcons() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section className="py-16 md:py-20 bg-white text-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          Tech Stack
        </motion.h2>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 lg:gap-10"
        >
          {techStack.map((tech, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{
                scale: 1.15,
                rotate: [0, -5, 5, 0],
                transition: { duration: 0.3 },
              }}
              className="flex flex-col items-center justify-center p-4 md:p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100"
            >
              <motion.div whileHover={{ y: -5 }} className="mb-3 group-hover:animate-float">
                {tech.icon}
              </motion.div>
              <p className="text-xs md:text-sm font-semibold text-center text-gray-700 group-hover:text-blue-600 transition-colors">
                {tech.name}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative Elements */}
        <div className="relative mt-12 flex justify-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center"
          >
            <p className="text-sm md:text-base text-gray-500 italic">
              Constantly learning and exploring new technologies
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
