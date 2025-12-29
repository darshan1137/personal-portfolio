"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebaseConfig";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { ArrowLeft, Quote, User } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

interface Testimonial {
  id: string;
  message: string;
  author: string;
  approved: boolean;
  createdAt: string;
}

export default function AllTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const q = query(
          collection(db, "testimonials"),
          where("approved", "==", true),
          limit(50)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Testimonial[];
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-indigo-950 dark:to-purple-950 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/#testimonials"
          className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mb-8 transition-colors font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Portfolio
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            What People Say
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Testimonials from clients, colleagues, and students I've worked with
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-600 dark:text-slate-400 font-medium">
                Loading testimonials...
              </p>
            </div>
          </div>
        ) : testimonials.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Quote className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Testimonials Yet
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Be the first to share your experience!
            </p>
            <Link
              href="/testimonial"
              className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              Write a Testimonial
            </Link>
          </motion.div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-indigo-100 dark:border-slate-700 group relative overflow-hidden"
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    {/* Quote Icon */}
                    <div className="absolute top-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Quote className="w-16 h-16 text-indigo-600 dark:text-indigo-400" />
                    </div>

                    {/* Author Avatar */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {getInitial(testimonial.author)}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                          {testimonial.author}
                        </h3>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mt-4">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        "{testimonial.message}"
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 shadow-2xl"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Want to Share Your Experience?
              </h3>
              <p className="text-indigo-100 mb-6">
                Your feedback helps me improve and inspires others!
              </p>
              <Link
                href="/testimonial"
                className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Write a Testimonial →
              </Link>
            </motion.div>
          </>
        )}
      </div>
      </div>
    </>
  );
}
