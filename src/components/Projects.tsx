"use client";

import { useEffect, useState, useRef } from "react";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { Variants } from "framer-motion";

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string;
  projectLink: string;
  image: string;
  order: number;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const q = query(
          collection(db, "projects"),
          where("approved", "==", true),
          orderBy("order", "desc")
        );
        const querySnapshot = await getDocs(q);
        const projectsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Project[];
        console.log("Projects fetched:", projectsData.length); // Debug log
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const firstCard = scrollContainerRef.current.querySelector("article");
      if (firstCard) {
        const cardFullWidth = firstCard.offsetWidth;
        scrollContainerRef.current.scrollBy({
          left: -cardFullWidth,
          behavior: "smooth",
        });
      }
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const firstCard = scrollContainerRef.current.querySelector("article");
      if (firstCard) {
        const cardFullWidth = firstCard.offsetWidth;
        scrollContainerRef.current.scrollBy({
          left: cardFullWidth,
          behavior: "smooth",
        });
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      className="bg-white dark:bg-slate-900 py-16 md:py-20 text-black dark:text-white"
      id="projects"
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          Projects
        </motion.h2>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : projects.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No projects found.</p>
        ) : (
          <div className="relative">
          {/* Navigation Buttons */}
          {projects.length > 0 && (
            <>
              <motion.button
                onClick={scrollLeft}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 p-3 bg-white dark:bg-gray-700 rounded-full shadow-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 z-20 hidden md:flex items-center justify-center transition-all"
                aria-label="Previous project"
              >
                <FaArrowLeft className="text-gray-800 dark:text-white" />
              </motion.button>
              <motion.button
                onClick={scrollRight}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 p-3 bg-white dark:bg-gray-700 rounded-full shadow-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 z-20 hidden md:flex items-center justify-center transition-all"
                aria-label="Next project"
              >
                <FaArrowRight className="text-gray-800 dark:text-white" />
              </motion.button>
            </>
          )}

          {/* Projects Carousel Container */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 px-4 md:px-16 lg:px-20 gap-4 md:gap-6"
              style={{ scrollbarWidth: "none" }}
            >
              {/* Hide scrollbar for Webkit browsers */}
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              {projects.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center w-full py-8 text-gray-500 dark:text-gray-400"
                >
                  No projects available yet.
                </motion.p>
              ) : (
                projects.map((proj) => (
                  <motion.article
                    key={proj.id}
                    variants={cardVariants}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="flex-shrink-0 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-1rem)] snap-center"
                  >
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-700/25 h-full flex flex-col transition-all duration-300 group">
                      {/* Image with Overlay Effect */}
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          alt={proj.title}
                          src={proj.image}
                          width={500}
                          height={300}
                          className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      <div className="p-5 md:p-6 flex-grow flex flex-col">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {proj.title}
                        </h3>{" "}
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4 flex-grow">
                          {proj.description}
                        </p>
                        {/* Tech Stack as Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {proj.techStack
                            .split(/,\s*|\s*\+\s*/)
                            .filter((tech) => tech.trim() !== "")
                            .map((tech, techIndex) => (
                              <motion.span
                                key={techIndex}
                                whileHover={{ scale: 1.1 }}
                                className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-900 dark:text-green-200 dark:ring-green-300/20"
                              >
                                {tech.trim()}
                              </motion.span>
                            ))}
                        </div>
                        {proj.projectLink && (
                          <motion.a
                            href={proj.projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ x: 5 }}
                            className="group inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline self-start"
                          >
                            View Project
                            <span
                              aria-hidden="true"
                              className="block transition-all group-hover:translate-x-1"
                            >
                              &rarr;
                            </span>
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))
              )}
            </div>
          </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
