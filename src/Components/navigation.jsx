import React, { useState, useRef } from "react";
import myPDF from "../assets/resume.pdf";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = myPDF;
    link.download = "Darshan Khapekar - Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      {/* For mobile view */}
      <div className="block md:hidden">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <a className="block text-teal-600" href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  width="64"
                  height="64"
                >
                  <circle cx="50" cy="50" r="45" fill="white" />
                  <circle cx="50" cy="50" r="30" fill="white" />
                  <text
                    x="35"
                    y="58"
                    font-family="Arial"
                    font-size="24"
                    fill="black"
                  >
                    D
                  </text>
                  <text
                    x="55"
                    y="58"
                    font-family="Arial"
                    font-size="24"
                    fill="black"
                  >
                    K
                  </text>
                </svg>
              </a>
            </div>
            <div>
              <div className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4"></div>
                <button
                  className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                  onClick={downloadPDF}
                >
                  Resume
                </button>
                <button
                  onClick={toggleMenu}
                  className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* For web view */}
      <div className="hidden md:block">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <a className="block text-teal-600" href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  width="64"
                  height="64"
                >
                  <circle cx="50" cy="50" r="45" fill="white" />
                  <circle cx="50" cy="50" r="30" fill="white" />
                  <text
                    x="35"
                    y="58"
                    font-family="Arial"
                    font-size="24"
                    fill="black"
                  >
                    D
                  </text>
                  <text
                    x="55"
                    y="58"
                    font-family="Arial"
                    font-size="24"
                    fill="black"
                  >
                    K
                  </text>
                </svg>
              </a>
            </div>
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm uppercase">
                <li>
                  <button className="text-gray-500 hover:text-green-500">
                    Home
                  </button>
                </li>
                <li>
                  <button className="text-gray-500 hover:text-green-500">
                    <a href="#about">About</a>
                  </button>
                </li>
                <li>
                  <button className="text-gray-500 hover:text-green-500">
                    <a href="#education">Education</a>
                  </button>
                </li>
                <li>
                  <button className="text-gray-500 hover:text-green-500">
                    <a href="#education">Tech Stack</a>
                  </button>
                </li>
                <li>
                  <button className="text-gray-500 hover:text-green-500">
                    <a href="#experience">Experience</a>
                  </button>
                </li>
                <li>
                  <button className="text-gray-500 hover:text-green-500">
                    <a href="#achievements">Achievements</a>
                  </button>
                </li>
                <li>
                  <button className="text-gray-500 hover:text-green-500">
                    <a href="#projects">Projects</a>
                  </button>
                </li>
                <li>
                  <button className="text-gray-500 hover:text-green-500">
                    <a href="#connect">Connect</a>
                  </button>
                </li>
                <li>
                  <button
                    className="rounded-md bg-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow"
                    onClick={downloadPDF}
                  >
                    Resume
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50">
          <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-6 rounded-md shadow-lg">
              <button
                onClick={() => {
                  toggleMenu(); // Close menu
                }}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                Close
              </button>
              <ul className="flex flex-col gap-4">
                <li>
                  <a href="#banner" onClick={toggleMenu}>
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" onClick={toggleMenu}>
                    About
                  </a>
                </li>
                <li>
                  <a href="#education" onClick={toggleMenu}>
                    Education
                  </a>
                </li>
                <li>
                  <a href="#tech-stack" onClick={toggleMenu}>
                    Tech Stack
                  </a>
                </li>
                <li>
                  <a href="#experience" onClick={toggleMenu}>
                    Experience
                  </a>
                </li>
                <li>
                  <a href="#achievements" onClick={toggleMenu}>
                    Achievements
                  </a>
                </li>
                <li>
                  <a href="#projects" onClick={toggleMenu}>
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#connect" onClick={toggleMenu}>
                    Connect
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
