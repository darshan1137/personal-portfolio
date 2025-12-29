"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { Variants } from "framer-motion";

interface Achievement {
  id: string;
  title: string;
  description: string;
  year: string;
  link?: string;
  image: string;
  order: number;
}

export default function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true);
        const q = query(
          collection(db, "achievements"),
          where("approved", "==", true),
          orderBy("order", "desc") // sort by order descending - latest first
        );
        const querySnapshot = await getDocs(q);
        const achievementsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Achievement[];
        console.log("Achievements fetched:", achievementsData.length); // Debug log
        setAchievements(achievementsData);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="bg-white dark:bg-slate-900 py-16 md:py-20" id="achievements">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          Achievements & Recognition
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-slate-600 dark:text-slate-400 mb-12 text-base md:text-lg max-w-3xl mx-auto"
        >
          7 Hackathon Wins • 15+ Hackathon Participations • National Level Recognition
        </motion.p>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : achievements.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No achievements found.</p>
        ) : (
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {achievements.map((ach) => (
              <motion.article
                key={ach.id}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.03 }}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900 dark:shadow-gray-700/25 transition-all duration-300 group"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    alt={ach.title}
                    src={ach.image}
                    width={500}
                    height={300}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-5 md:p-6">
                  <motion.h3
                    whileHover={{ x: 5 }}
                    className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                  >
                    {ach.title}{" "}
                    <span className="text-sm text-gray-400 font-normal">({ach.year})</span>
                  </motion.h3>

                  <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400 line-clamp-3">
                    {ach.description}
                  </p>

                  {ach.link && (
                    <motion.a
                      href={ach.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 5 }}
                      className="group/link mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      View More
                      <span
                        aria-hidden="true"
                        className="block transition-all group-hover/link:translate-x-1"
                      >
                        &rarr;
                      </span>
                    </motion.a>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
