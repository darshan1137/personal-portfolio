"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string;
  projectLink: string;
  image: string;
  order: number;
  approved: boolean; // Add this if 'approved' is part of your project data
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  year: string;
  link: string;
  image: string;
  order: number;
  approved: boolean; // Add this if 'approved' is part of your achievement data
}

interface Testimonial {
  id: string;
  author: string;
  message: string;
  approved: boolean;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("projects"); // State for active tab

  const [projects, setProjects] = useState<Project[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // Pagination states for Projects
  const [lastProjectDoc, setLastProjectDoc] = useState<any>(null);
  const [hasMoreProjects, setHasMoreProjects] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const projectsLimit = 4; // Display 4 items per load

  // Pagination states for Achievements
  const [lastAchievementDoc, setLastAchievementDoc] = useState<any>(null);
  const [hasMoreAchievements, setHasMoreAchievements] = useState(true);
  const [loadingAchievements, setLoadingAchievements] = useState(false);
  const achievementsLimit = 4; // Display 4 items per load

  // Pagination states for Testimonials
  const [lastTestimonialDoc, setLastTestimonialDoc] = useState<any>(null);
  const [hasMoreTestimonials, setHasMoreTestimonials] = useState(true);
  const [loadingTestimonials, setLoadingTestimonials] = useState(false);
  const testimonialsLimit = 4; // Display 4 items per load

  // Form states
  const [project, setProject] = useState({
    title: "",
    description: "",
    techStack: "",
    projectLink: "",
    image: "",
    order: 0,
  });

  const [achievement, setAchievement] = useState({
    title: "",
    description: "",
    year: "",
    link: "",
    image: "",
    order: 0,
  });

  const [testimonial, setTestimonial] = useState({
    author: "",
    message: "",
    approved: false, // Default to not approved, or adjust as per your workflow
  });

  // State for form validation errors
  const [projectErrors, setProjectErrors] = useState<{ [key: string]: string }>({});
  const [achievementErrors, setAchievementErrors] = useState<{
    [key: string]: string;
  }>({});
  const [testimonialErrors, setTestimonialErrors] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
        // Only fetch data for the initially active tab
        fetchDataForActiveTab(activeTab);
      }
    });

    return () => unsubscribe();
  }, [activeTab]); // Re-run effect when activeTab changes

  const fetchDataForActiveTab = async (tab: string) => {
    switch (tab) {
      case "projects":
        await fetchProjects(true);
        break;
      case "achievements":
        await fetchAchievements(true);
        break;
      case "testimonials":
        await fetchTestimonials(true);
        break;
      default:
        break;
    }
  };

  // --- Fetch Projects with Pagination ---
  const fetchProjects = async (initial = false) => {
    if (!hasMoreProjects && !initial) return;
    setLoadingProjects(true);

    let projectsQuery = query(
      collection(db, "projects"),
      orderBy("order", "asc"),
      limit(projectsLimit)
    );

    if (!initial && lastProjectDoc) {
      projectsQuery = query(projectsQuery, startAfter(lastProjectDoc));
    }

    try {
      const projSnap = await getDocs(projectsQuery);
      const newProjects = projSnap.docs.map((doc) => {
        const data = doc.data() as Omit<Project, "id">; // Cast to Project without 'id'
        return {
          id: doc.id,
          ...data,
        };
      });

      if (initial) {
        setProjects(newProjects);
      } else {
        setProjects((prev) => [...prev, ...newProjects]);
      }

      setLastProjectDoc(projSnap.docs[projSnap.docs.length - 1]);
      setHasMoreProjects(newProjects.length === projectsLimit);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoadingProjects(false);
    }
  };

  // --- Fetch Achievements with Pagination ---
  const fetchAchievements = async (initial = false) => {
    if (!hasMoreAchievements && !initial) return;
    setLoadingAchievements(true);

    let achievementsQuery = query(
      collection(db, "achievements"),
      orderBy("order", "asc"),
      limit(achievementsLimit)
    );

    if (!initial && lastAchievementDoc) {
      achievementsQuery = query(achievementsQuery, startAfter(lastAchievementDoc));
    }

    try {
      const achSnap = await getDocs(achievementsQuery);
      const newAchievements = achSnap.docs.map((doc) => {
        const data = doc.data() as Omit<Achievement, "id">; // Cast to Achievement without 'id'
        return {
          id: doc.id,
          ...data,
        };
      });

      if (initial) {
        setAchievements(newAchievements);
      } else {
        setAchievements((prev) => [...prev, ...newAchievements]);
      }

      setLastAchievementDoc(achSnap.docs[achSnap.docs.length - 1]);
      setHasMoreAchievements(newAchievements.length === achievementsLimit);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    } finally {
      setLoadingAchievements(false);
    }
  };

  // --- Fetch Testimonials with Pagination ---
  const fetchTestimonials = async (initial = false) => {
    if (!hasMoreTestimonials && !initial) return;
    setLoadingTestimonials(true);

    let testimonialsQuery = query(
      collection(db, "testimonials"),
      orderBy("author", "asc"),
      limit(testimonialsLimit)
    );

    if (!initial && lastTestimonialDoc) {
      testimonialsQuery = query(testimonialsQuery, startAfter(lastTestimonialDoc));
    }

    try {
      const testSnap = await getDocs(testimonialsQuery);
      const newTestimonials = testSnap.docs.map((doc) => {
        const data = doc.data() as Omit<Testimonial, "id">; // Cast to Testimonial without 'id'
        return {
          id: doc.id,
          ...data,
        };
      });
      if (initial) {
        setTestimonials(newTestimonials);
      } else {
        setTestimonials((prev) => [...prev, ...newTestimonials]);
      }

      setLastTestimonialDoc(testSnap.docs[testSnap.docs.length - 1]);
      setHasMoreTestimonials(newTestimonials.length === testimonialsLimit);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoadingTestimonials(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: Function) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic file size and type validation before upload
    if (file.size > 2 * 1024 * 1024) {
      // 2MB limit
      alert("Image size must be less than 2MB.");
      e.target.value = ""; // Clear the input
      return;
    }
    if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      alert("Only JPG, PNG, and GIF images are allowed.");
      e.target.value = ""; // Clear the input
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        // You might want to show a specific loading indicator for image upload here
        const res = await axios.post("/api/upload", { file: reader.result });
        setter((prev: any) => ({ ...prev, image: res.data.url }));
        alert("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
      }
    };
    reader.readAsDataURL(file);
  };

  // --- Form Validation Functions ---
  const validateProjectForm = () => {
    const errors: { [key: string]: string } = {};
    if (!project.title.trim()) errors.title = "Title is required.";
    if (!project.description.trim()) errors.description = "Description is required.";
    if (!project.techStack.trim()) errors.techStack = "Tech Stack is required.";
    if (!project.projectLink.trim()) errors.projectLink = "Project Link is required.";
    if (!project.image) errors.image = "Image is required.";
    setProjectErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateAchievementForm = () => {
    const errors: { [key: string]: string } = {};
    if (!achievement.title.trim()) errors.title = "Title is required.";
    if (!achievement.description.trim()) errors.description = "Description is required.";
    if (!achievement.year.trim()) errors.year = "Year is required.";
    if (!achievement.image) errors.image = "Image is required.";
    setAchievementErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateTestimonialForm = () => {
    const errors: { [key: string]: string } = {};
    if (!testimonial.author.trim()) errors.author = "Author is required.";
    if (!testimonial.message.trim()) errors.message = "Message is required.";
    setTestimonialErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addProject = async () => {
    if (!validateProjectForm()) {
      alert("Please fill in all required project fields.");
      return;
    }
    try {
      await addDoc(collection(db, "projects"), { ...project, approved: false });
      setProject({
        title: "",
        description: "",
        techStack: "",
        projectLink: "",
        image: "",
        order: 0,
      });
      setProjectErrors({}); // Clear errors on success
      setProjects([]); // Clear existing projects
      setLastProjectDoc(null); // Reset pagination
      setHasMoreProjects(true);
      await fetchProjects(true); // Re-fetch first page
      alert("Project added successfully!");
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Failed to add project. Please try again.");
    }
  };

  const addAchievement = async () => {
    if (!validateAchievementForm()) {
      alert("Please fill in all required achievement fields.");
      return;
    }
    try {
      await addDoc(collection(db, "achievements"), {
        ...achievement,
        approved: false,
      });
      setAchievement({
        title: "",
        description: "",
        year: "",
        link: "",
        image: "",
        order: 0,
      });
      setAchievementErrors({}); // Clear errors on success
      setAchievements([]);
      setLastAchievementDoc(null);
      setHasMoreAchievements(true);
      await fetchAchievements(true);
      alert("Achievement added successfully!");
    } catch (error) {
      console.error("Error adding achievement:", error);
      alert("Failed to add achievement. Please try again.");
    }
  };

  const addTestimonial = async () => {
    if (!validateTestimonialForm()) {
      alert("Please fill in all required testimonial fields.");
      return;
    }
    try {
      await addDoc(collection(db, "testimonials"), {
        ...testimonial,
        approved: false,
      });
      setTestimonial({
        author: "",
        message: "",
        approved: false,
      });
      setTestimonialErrors({});
      setTestimonials([]);
      setLastTestimonialDoc(null);
      setHasMoreTestimonials(true);
      await fetchTestimonials(true);
      alert("Testimonial added successfully!");
    } catch (error) {
      console.error("Error adding testimonial:", error);
      alert("Failed to add testimonial. Please try again.");
    }
  };

  const handleApprove = async (id: string, type: "projects" | "achievements" | "testimonials") => {
    try {
      await updateDoc(doc(db, type, id), { approved: true });
      // Re-fetch the appropriate data to reflect the change
      if (type === "projects") {
        setProjects([]);
        setLastProjectDoc(null);
        setHasMoreProjects(true);
        await fetchProjects(true);
      } else if (type === "achievements") {
        setAchievements([]);
        setLastAchievementDoc(null);
        setHasMoreAchievements(true);
        await fetchAchievements(true);
      } else if (type === "testimonials") {
        setTestimonials([]);
        setLastTestimonialDoc(null);
        setHasMoreTestimonials(true);
        await fetchTestimonials(true);
      }
      alert("Item approved successfully!");
    } catch (error) {
      console.error(`Error approving ${type.slice(0, -1)}:`, error);
      alert(`Failed to approve ${type.slice(0, -1)}. Please try again.`);
    }
  };

  const handleDelete = async (id: string, type: "projects" | "achievements" | "testimonials") => {
    if (!confirm(`Are you sure you want to delete this ${type.slice(0, -1)}?`)) {
      return;
    }
    try {
      await deleteDoc(doc(db, type, id));
      // Re-fetch the appropriate data after deletion
      if (type === "projects") {
        setProjects([]);
        setLastProjectDoc(null);
        setHasMoreProjects(true);
        await fetchProjects(true);
      } else if (type === "achievements") {
        setAchievements([]);
        setLastAchievementDoc(null);
        setHasMoreAchievements(true);
        await fetchAchievements(true);
      } else if (type === "testimonials") {
        setTestimonials([]);
        setLastTestimonialDoc(null);
        setHasMoreTestimonials(true);
        await fetchTestimonials(true);
      }
      alert("Item deleted successfully!");
    } catch (error) {
      console.error(`Error deleting ${type.slice(0, -1)}:`, error);
      alert(`Failed to delete ${type.slice(0, -1)}. Please try again.`);
    }
  };

  const updateOrder = async (id: string, type: "projects" | "achievements", newOrder: number) => {
    try {
      await updateDoc(doc(db, type, id), { order: newOrder });
      // Re-fetch to reflect order change
      if (type === "projects") {
        setProjects([]);
        setLastProjectDoc(null);
        setHasMoreProjects(true);
        await fetchProjects(true);
      } else if (type === "achievements") {
        setAchievements([]);
        setLastAchievementDoc(null);
        setHasMoreAchievements(true);
        await fetchAchievements(true);
      }
      alert("Order updated successfully!");
    } catch (error) {
      console.error(`Error updating ${type.slice(0, -1)} order:`, error);
      alert(`Failed to update ${type.slice(0, -1)} order. Please try again.`);
    }
  };

  // --- Tailwind CSS Helper Classes ---
  const inputClassName = (hasError: boolean) =>
    `input p-3 rounded-xl bg-slate-800/50 border ${
      hasError ? "border-rose-500 ring-2 ring-rose-500/20" : "border-slate-700"
    } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full text-white placeholder-slate-400 transition-all duration-300`;

  const errorTextClassName = "text-rose-400 text-sm mt-1.5 font-medium";

  const tabButtonClass = (tabName: string) =>
    `px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
      activeTab === tabName
        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 scale-105"
        : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/70 hover:text-white"
    }`;

  // --- Simple Loading Spinner Component ---
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center space-x-3 text-indigo-400 py-6">
      <div className="w-6 h-6 border-3 border-current border-t-transparent rounded-full animate-spin"></div>
      <span className="font-medium">Loading...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 text-white p-4 md:p-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
      <div className="relative z-10">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-6 md:p-8 mb-8 border border-white/10 backdrop-blur-sm">
          {" "}
          <div className="absolute inset-0 bg-white/5 rounded-3xl"></div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Admin Dashboard</h1>
              <p className="text-indigo-100 text-sm md:text-base">Manage your portfolio content</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl transition-all duration-300 shadow-lg border border-white/20 font-semibold flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-3 mb-8 bg-slate-800/30 backdrop-blur-sm p-2 rounded-2xl border border-slate-700/50">
          <button className={tabButtonClass("projects")} onClick={() => setActiveTab("projects")}>
            📂 Projects
          </button>
          <button
            className={tabButtonClass("achievements")}
            onClick={() => setActiveTab("achievements")}
          >
            🏆 Achievements
          </button>
          <button
            className={tabButtonClass("testimonials")}
            onClick={() => setActiveTab("testimonials")}
          >
            💬 Testimonials
          </button>
        </div>

        {/* Conditional Rendering based on activeTab */}
        {activeTab === "projects" && (
          <>
            {/* Add Project Section */}
            <section className="mb-8 bg-slate-800/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl border border-slate-700">
              <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <span className="text-2xl">➕</span> Add New Project
              </h2>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Project Title
                  </label>
                  <input
                    placeholder="Project Title"
                    value={project.title}
                    onChange={(e) => setProject({ ...project, title: e.target.value })}
                    className={inputClassName(!!projectErrors.title)}
                  />
                  {projectErrors.title && (
                    <p className={errorTextClassName}>{projectErrors.title}</p>
                  )}
                </div>
                <div>
                  <input
                    placeholder="Tech Stack (e.g., React, Node.js)"
                    value={project.techStack}
                    onChange={(e) => setProject({ ...project, techStack: e.target.value })}
                    className={inputClassName(!!projectErrors.techStack)}
                  />
                  {projectErrors.techStack && (
                    <p className={errorTextClassName}>{projectErrors.techStack}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <textarea
                    placeholder="Project Description"
                    value={project.description}
                    onChange={(e) => setProject({ ...project, description: e.target.value })}
                    className={`${inputClassName(!!projectErrors.description)} w-full resize-y`}
                    rows={3}
                  />
                  {projectErrors.description && (
                    <p className={errorTextClassName}>{projectErrors.description}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <input
                    placeholder="Project Link (URL)"
                    value={project.projectLink}
                    onChange={(e) => setProject({ ...project, projectLink: e.target.value })}
                    className={inputClassName(!!projectErrors.projectLink)}
                  />
                  {projectErrors.projectLink && (
                    <p className={errorTextClassName}>{projectErrors.projectLink}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Project Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setProject)}
                    className={`block w-full text-sm text-slate-300
                              file:mr-4 file:py-3 file:px-6
                              file:rounded-xl file:border-0
                              file:text-sm file:font-semibold
                              file:bg-gradient-to-r file:from-indigo-600 file:to-purple-600
                              file:text-white file:cursor-pointer
                              hover:file:from-indigo-700 hover:file:to-purple-700
                              file:transition-all file:duration-300
                              cursor-pointer ${
                                !!projectErrors.image
                                  ? "border-2 border-rose-500 rounded-xl p-2"
                                  : "border-2 border-slate-700 rounded-xl p-2"
                              }`}
                  />
                  {projectErrors.image && (
                    <p className={errorTextClassName}>{projectErrors.image}</p>
                  )}
                  {project.image && (
                    <div className="mt-4 flex items-center gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-600">
                      <img
                        src={project.image}
                        alt="Project Preview"
                        className="w-20 h-20 object-cover rounded-lg border-2 border-indigo-500 shadow-lg"
                      />
                      <div>
                        <p className="text-emerald-400 font-semibold flex items-center gap-2">
                          <span>✅</span> Image uploaded successfully!
                        </p>
                        <p className="text-slate-400 text-xs mt-1">Ready to be saved</p>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={addProject}
                  className="md:col-span-2 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-indigo-500/50 transform hover:scale-[1.02]"
                >
                  ➕ Add Project
                </button>
              </div>
            </section>

            {/* Projects List */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <span className="text-2xl">📂</span> All Projects
              </h2>
              <div className="grid lg:grid-cols-2 gap-6">
                {projects.map((p: any) => (
                  <div
                    key={p.id}
                    className="bg-gray-800 p-5 rounded-lg shadow-md border border-gray-700 transition-transform transform hover:scale-[1.02] duration-200"
                  >
                    <h3 className="text-xl font-semibold text-blue-200 mb-2">{p.title}</h3>
                    <p className="text-gray-300 text-sm mb-2">{p.description}</p>
                    <p className="text-gray-400 text-xs">Tech Stack: {p.techStack}</p>
                    {p.projectLink && (
                      <a
                        href={p.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline text-sm mt-1 block"
                      >
                        View Project
                      </a>
                    )}
                    {p.image && (
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-32 object-cover rounded-md mt-3"
                      />
                    )}
                    <div className="mt-3 flex items-center space-x-2">
                      <span className="text-gray-400 text-sm">Order:</span>
                      <input
                        type="number"
                        defaultValue={p.order}
                        onBlur={(e) => updateOrder(p.id, "projects", Number(e.target.value))}
                        className="p-1 w-20 text-black rounded text-center bg-gray-300"
                      />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {!p.approved && (
                        <button
                          onClick={() => handleApprove(p.id, "projects")}
                          className="btn px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-sm"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(p.id, "projects")}
                        className="btn px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {loadingProjects && <LoadingSpinner />}
              {hasMoreProjects && !loadingProjects && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => fetchProjects()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg"
                  >
                    Load More Projects
                  </button>
                </div>
              )}
              {!hasMoreProjects && !loadingProjects && projects.length > 0 && (
                <p className="text-center text-gray-500 mt-4">All projects loaded.</p>
              )}
              {!loadingProjects && projects.length === 0 && (
                <p className="text-center text-gray-500 mt-4">No projects found. Add one above!</p>
              )}
            </section>
          </>
        )}
        {activeTab === "achievements" && (
          <>
            {/* Add Achievement Section */}
            <section className="mb-10 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 animate-fade-in">
              <h2 className="text-2xl font-bold mb-5 text-blue-300">Add New Achievement</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <input
                    placeholder="Achievement Title"
                    value={achievement.title}
                    onChange={(e) => setAchievement({ ...achievement, title: e.target.value })}
                    className={inputClassName(!!achievementErrors.title)}
                  />
                  {achievementErrors.title && (
                    <p className={errorTextClassName}>{achievementErrors.title}</p>
                  )}
                </div>
                <div>
                  <input
                    placeholder="Year (e.g., 2023)"
                    value={achievement.year}
                    onChange={(e) => setAchievement({ ...achievement, year: e.target.value })}
                    className={inputClassName(!!achievementErrors.year)}
                  />
                  {achievementErrors.year && (
                    <p className={errorTextClassName}>{achievementErrors.year}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <textarea
                    placeholder="Achievement Description"
                    value={achievement.description}
                    onChange={(e) =>
                      setAchievement({
                        ...achievement,
                        description: e.target.value,
                      })
                    }
                    className={`${inputClassName(!!achievementErrors.description)} w-full resize-y`}
                    rows={3}
                  />
                  {achievementErrors.description && (
                    <p className={errorTextClassName}>{achievementErrors.description}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <input
                    placeholder="Optional Link (URL)"
                    value={achievement.link}
                    onChange={(e) => setAchievement({ ...achievement, link: e.target.value })}
                    className={inputClassName(false)} // Link is optional, so no error state for it
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-400 text-sm mb-1">Achievement Image:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setAchievement)}
                    className={`block w-full text-sm text-gray-400
                              file:mr-4 file:py-2 file:px-4
                              file:rounded-full file:border-0
                              file:text-sm file:font-semibold
                              file:bg-blue-50 file:text-blue-700
                              hover:file:bg-blue-100 ${
                                !!achievementErrors.image
                                  ? "border border-red-500 rounded-md p-1"
                                  : ""
                              }`}
                  />
                  {achievementErrors.image && (
                    <p className={errorTextClassName}>{achievementErrors.image}</p>
                  )}
                  {achievement.image && (
                    <div className="mt-4 flex items-center space-x-4">
                      <img
                        src={achievement.image}
                        alt="Achievement Preview"
                        className="w-24 h-24 object-cover rounded-md border border-gray-600"
                      />
                      <p className="text-gray-400 text-sm">Image Ready!</p>
                    </div>
                  )}
                </div>
                <button
                  onClick={addAchievement}
                  className="btn-primary md:col-span-2 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-300"
                >
                  Add Achievement
                </button>
              </div>
            </section>

            {/* Achievements List */}
            <section className="mb-10 animate-fade-in">
              <h2 className="text-2xl font-bold mb-4 text-blue-300">All Achievements</h2>
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {achievements.map((a: any) => (
                  <div
                    key={a.id}
                    className="bg-gray-800 p-5 rounded-lg shadow-md border border-gray-700 transition-transform transform hover:scale-[1.02] duration-200"
                  >
                    <h3 className="text-xl font-semibold text-blue-200 mb-2">{a.title}</h3>
                    <p className="text-gray-300 text-sm mb-1">{a.description}</p>
                    <p className="text-gray-400 text-xs">Year: {a.year}</p>
                    {a.link && (
                      <a
                        href={a.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline text-sm mt-1 block"
                      >
                        View Link
                      </a>
                    )}
                    {a.image && (
                      <img
                        src={a.image}
                        alt={a.title}
                        className="w-full h-32 object-cover rounded-md mt-3"
                      />
                    )}
                    <div className="mt-3 flex items-center space-x-2">
                      <span className="text-gray-400 text-sm">Order:</span>
                      <input
                        type="number"
                        defaultValue={a.order}
                        onBlur={(e) => updateOrder(a.id, "achievements", Number(e.target.value))}
                        className="p-1 w-20 text-black rounded text-center bg-gray-300"
                      />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {!a.approved && (
                        <button
                          onClick={() => handleApprove(a.id, "achievements")}
                          className="btn px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-sm"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(a.id, "achievements")}
                        className="btn px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {loadingAchievements && <LoadingSpinner />}
              {hasMoreAchievements && !loadingAchievements && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => fetchAchievements()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg"
                  >
                    Load More Achievements
                  </button>
                </div>
              )}
              {!hasMoreAchievements && !loadingAchievements && achievements.length > 0 && (
                <p className="text-center text-gray-500 mt-4">All achievements loaded.</p>
              )}
              {!loadingAchievements && achievements.length === 0 && (
                <p className="text-center text-gray-500 mt-4">
                  No achievements found. Add one above!
                </p>
              )}
            </section>
          </>
        )}
        {activeTab === "testimonials" && (
          <>
            {/* Testimonials List */}
            <section className="mb-10 animate-fade-in">
              <h2 className="text-2xl font-bold mb-4 text-blue-300">All Testimonials</h2>
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {testimonials.map((t: any) => (
                  <div
                    key={t.id}
                    className="bg-gray-800 p-5 rounded-lg shadow-md border border-gray-700 transition-transform transform hover:scale-[1.02] duration-200"
                  >
                    <p className="text-gray-300 italic mb-2">"{t.message}"</p>
                    <p className="text-gray-400 text-sm mt-1">- {t.author}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {!t.approved && (
                        <button
                          onClick={() => handleApprove(t.id, "testimonials")}
                          className="btn px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-sm"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(t.id, "testimonials")}
                        className="btn px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {loadingTestimonials && <LoadingSpinner />}
              {hasMoreTestimonials && !loadingTestimonials && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => fetchTestimonials()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg"
                  >
                    Load More Testimonials
                  </button>
                </div>
              )}
              {!hasMoreTestimonials && !loadingTestimonials && testimonials.length > 0 && (
                <p className="text-center text-gray-500 mt-4">All testimonials loaded.</p>
              )}
              {!loadingTestimonials && testimonials.length === 0 && (
                <p className="text-center text-gray-500 mt-4">
                  No testimonials found. Add one above!
                </p>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
