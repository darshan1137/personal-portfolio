"use client";

import { useEffect, useState, useRef } from "react";
import { db } from "@/lib/firebaseConfig";
import { collection, query, where, getDocs, addDoc, limit } from "firebase/firestore";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";

interface Testimonial {
  id?: string;
  message: string;
  author: string;
  approved?: boolean;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [paddedTestimonials, setPaddedTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [newTestimonial, setNewTestimonial] = useState<Testimonial>({
    author: "",
    message: "",
  });
  const visibleCount = 3;

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const q = query(collection(db, "testimonials"), where("approved", "==", true), limit(50));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Testimonial[];
        setTestimonials(data);

        if (data.length > 0) {
          const firstBatch = data.slice(0, visibleCount);
          const lastBatch = data.slice(data.length - visibleCount);
          setPaddedTestimonials([...lastBatch, ...data, ...firstBatch]);
          setCurrentIndex(visibleCount);
        } else {
          setPaddedTestimonials([]);
          setCurrentIndex(0);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (paddedTestimonials.length > 0) {
      const startAutoPlay = () => {
        intervalRef.current = setInterval(() => {
          setIsTransitioning(true);
          setCurrentIndex((prev) => prev + visibleCount);
        }, 4000);
      };

      startAutoPlay();

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [paddedTestimonials.length, visibleCount]);

  useEffect(() => {
    if (testimonials.length === 0) return;

    if (currentIndex >= testimonials.length + visibleCount) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false); // Temporarily disable transition
        setCurrentIndex(visibleCount); // Jump back to the real start
      }, 700); // Match this duration to your CSS transition duration

      return () => clearTimeout(timeout);
    }

    if (currentIndex < visibleCount && currentIndex !== 0 && !isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(testimonials.length + currentIndex);
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, testimonials.length, visibleCount, isTransitioning]);

  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!newTestimonial.author.trim()) {
      errors.author = "Your name is required.";
    }
    if (!newTestimonial.message.trim()) {
      errors.message = "Your feedback is required.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      await addDoc(collection(db, "testimonials"), {
        ...newTestimonial,
        approved: false,
      });

      setNewTestimonial({ author: "", message: "" });
      setFormErrors({});
      alert("Thank you! Your testimonial will be reviewed and published soon.");
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      alert("Failed to submit testimonial. Please try again.");
    }
  };

  const inputClassName = (hasError: boolean) =>
    `w-full p-2 rounded border ${
      hasError ? "border-red-500" : "border-gray-300 dark:border-gray-600"
    } dark:bg-gray-700 dark:text-white`;

  const errorTextClassName = "text-red-400 text-sm mt-1";

  return (
    <section className="bg-gray-50 dark:bg-slate-800 py-16 md:py-20" id="testimonials">
      <div className="max-w-6xl mx-auto text-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          Testimonials
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto"
        >
          What people say about working with me
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Link
            href="/testimonial"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-indigo-500/50 transform hover:scale-105"
          >
            <MessageSquare className="w-5 h-5" />
            Share Your Experience
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-400 rounded-xl font-semibold transition-all duration-300 shadow-lg border border-indigo-200 dark:border-slate-700 transform hover:scale-105"
          >
            View All Testimonials
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        {testimonials.length > 0 ? (
          <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden w-full max-w-5xl mx-auto py-4 group"
          >
            <div
              className={`flex ${
                isTransitioning ? "transition-transform duration-700 ease-in-out" : ""
              }`}
              style={{
                transform: `translateX(-${
                  (currentIndex / visibleCount) * (100 / (paddedTestimonials.length / visibleCount))
                }%)`,
              }}
            >
              {paddedTestimonials.map((t, index) => (
                <div key={`${t.id}-${index}`} className="flex-shrink-0 w-full md:w-1/3 px-3">
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg relative h-full flex flex-col justify-between transition-all duration-300 hover:shadow-2xl border border-gray-100 dark:border-gray-700"
                  >
                    <FaQuoteLeft className="text-indigo-400 text-2xl absolute top-3 left-3" />
                    <p className="italic text-gray-700 dark:text-gray-300 mt-8 mb-6 text-sm md:text-base leading-relaxed">
                      {t.message}
                    </p>
                    <FaQuoteRight className="text-indigo-400 text-2xl absolute bottom-3 right-3" />
                    <div className="flex items-center justify-center mt-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center rounded-full font-bold text-lg mr-3 shadow-md">
                        {getInitial(t.author)}
                      </div>
                      <p className="font-semibold text-indigo-600 dark:text-indigo-400 text-base">
                        {t.author}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500 dark:text-gray-400 mt-8"
          >
            No testimonials available yet. Be the first to share your experience!
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 md:mt-16 max-w-2xl mx-auto text-left bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            Share Your Experience
          </h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                placeholder="Your Name"
                value={newTestimonial.author}
                onChange={(e) =>
                  setNewTestimonial({
                    ...newTestimonial,
                    author: e.target.value,
                  })
                }
                className={inputClassName(!!formErrors.author)}
              />
              {formErrors.author && <p className={errorTextClassName}>{formErrors.author}</p>}
            </div>
            <div>
              <motion.textarea
                whileFocus={{ scale: 1.02 }}
                placeholder="Your Feedback"
                value={newTestimonial.message}
                onChange={(e) =>
                  setNewTestimonial({
                    ...newTestimonial,
                    message: e.target.value,
                  })
                }
                rows={4}
                className={inputClassName(!!formErrors.message)}
              ></motion.textarea>
              {formErrors.message && <p className={errorTextClassName}>{formErrors.message}</p>}
            </div>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(99, 102, 241, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg w-full transition-all duration-300 shadow-lg"
            >
              Submit Testimonial
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
