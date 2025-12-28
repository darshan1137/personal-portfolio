"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { Variants } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

interface ExperienceItem {
  role: string;
  company: string;
  location?: string;
  period: string;
  description: string;
  skills: string[];
  current?: boolean;
}

const experienceData: ExperienceItem[] = [
  {
    role: "Educator",
    company: "Excellent Tutorials NX",
    location: "Kalyan, Maharashtra, India",
    period: "Oct 2024 - Present",
    description:
      "Conducting regular lectures for 11th and 12th IT for Commerce Students. Part-time educator role focused on Information Technology curriculum.",
    skills: ["Teaching", "IT Education", "Commerce IT", "Curriculum Delivery"],
    current: true,
  },
  {
    role: "Educator",
    company: "V2V EdTech LLP",
    location: "Mumbai, India",
    period: "June 2023 - October 2025",
    description:
      "Part of Core Teaching Team, providing training and supervising tech team. Led Instructor for Mobile Application Development Internship.",
    skills: ["Teaching", "Mobile Development", "Team Management", "Curriculum Design"],
  },
  {
    role: "Founder",
    company: "Coding Gurus",
    location: "Mumbai, India",
    period: "Feb 2023 - Present",
    description:
      "Founded and leading a tech collective building innovative tech solutions. Conducting sessions and mentoring students for career development in programming, data structures, and web development.",
    skills: ["Leadership", "Mentoring", "Tech Solutions", "Team Building"],
    current: true,
  },
  {
    role: "Second Year Coordinator",
    company: "IEEE VESIT",
    location: "Mumbai, India",
    period: "Oct 2023 - Apr 2024",
    description:
      "Coordinated multiple technical and non-technical events. Led development of 2 Web Projects for the Council.",
    skills: ["Event Management", "Web Development", "Leadership", "Coordination"],
  },
  {
    role: "Internshala Student Partner",
    company: "Internshala",
    location: "Remote",
    period: "May 2023 - June 2023",
    description: "Completed Internshala Campus Ambassador Program.",
    skills: ["Marketing", "Communication", "Campus Ambassador"],
  },
  {
    role: "Technical Head of IT Program",
    company: "Vidyalankar Polytechnic",
    location: "Mumbai, India",
    period: "Nov 2022 - June 2023",
    description:
      "Supervised seminars and technical events. Guided activities on Web3, Mobile Apps, and Development Club initiatives.",
    skills: ["Event Planning", "Web3", "Mobile Apps", "Leadership"],
  },
  {
    role: "Junior Developer",
    company: "SoftScribble",
    location: "Remote",
    period: "May 2022 - Dec 2022",
    description:
      "Worked on automation software, API Development, and SEO strategies. Collaborated on Database and VPS knowledge enhancement.",
    skills: ["API Development", "Automation", "SEO", "Database Management"],
  },
  {
    role: "Visiting Faculty & Examiner",
    company: "Excellent Tutorials",
    location: "Mumbai, India",
    period: "2022",
    description:
      "Delivered lectures on tech concepts, paper corrections. Guided 100+ students for technical exams.",
    skills: ["Teaching", "Examination", "Mentoring", "Technical Training"],
  },
];

export default function Experience() {
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

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="bg-white dark:bg-slate-900 py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          Experience
        </motion.h2>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative max-w-4xl mx-auto"
        >
          {/* Modern Timeline Line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-200 via-purple-200 to-pink-200 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800"></div>

          <div className="space-y-8 md:space-y-12">
            {experienceData.map((exp, index) => (
              <motion.div key={index} variants={itemVariants} className="relative pl-12 md:pl-20">
                {/* Timeline Node */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="absolute left-2.5 md:left-6 top-6 w-4 h-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border-4 border-white dark:border-slate-900 shadow-lg z-10"
                >
                  {exp.current && (
                    <span className="absolute inset-0 rounded-full bg-indigo-500 animate-ping"></span>
                  )}
                </motion.div>

                {/* Experience Card */}
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.15)" }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-slate-700"
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold mb-1">
                        <Briefcase className="w-4 h-4" />
                        <span className="text-base md:text-lg">{exp.company}</span>
                      </div>
                      {exp.location && (
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{exp.location}</span>
                        </div>
                      )}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ${
                        exp.current
                          ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30"
                          : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30"
                      }`}
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </motion.div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-5 leading-relaxed text-sm md:text-base">
                    {exp.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 * i }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 text-indigo-700 dark:text-indigo-300 rounded-lg text-xs md:text-sm font-medium border border-indigo-100 dark:border-indigo-800/50 shadow-sm"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
