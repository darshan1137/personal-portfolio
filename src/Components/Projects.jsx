import React from "react";
import ieee from "../assets/ieee.png";
import wastewiseweb from "../assets/wastewiseweb.png";
import tripsync from "../assets/tripsync.jpg";
import technotho from "../assets/technotho-project.png";

function Projects() {
  return (
    <div id="projects">
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-10 mx-auto">
          <div class="text-center mb-20">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Projects
              </h1>
            </div>
            <div class="flex mt-6 justify-center">
              <div class="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
            </div>
          </div>
          <div class="flex flex-wrap -m-4">
            <div class="xl:w-1/4 md:w-1/2 p-4">
              <div class="bg-gray-100 p-6 rounded-lg">
                <img
                  class="h-40 rounded w-full object-cover object-center mb-6"
                  src={ieee}
                  alt="content"
                />
                <h2 class="text-lg text-gray-900 font-medium title-font mb-4">
                  IEEE VESIT
                </h2>
                <p class="leading-relaxed text-base">
                  IEEE VESIT website contains information about the council
                  along with all the workshops and seminars.
                </p>
                <a
                  href="https://ieeevesit.org/"
                  className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
                >
                  Find out more
                  <span
                    aria-hidden="true"
                    className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                  >
                    &rarr;
                  </span>
                </a>
              </div>
            </div>
            <div class="xl:w-1/4 md:w-1/2 p-4">
              <div class="bg-gray-100 p-6 rounded-lg">
                <img
                  class="h-40 rounded w-full object-cover object-center mb-6"
                  src={wastewiseweb}
                  alt="content"
                />
                <h2 class="text-lg text-gray-900 font-medium title-font mb-4">
                  Waste Wise Web
                </h2>
                <p class="leading-relaxed text-base">
                  Waste Wise Web is a waste management project that won third
                  prize at Rotacodefest Hackathon.
                </p>
                <a
                  href="https://codevista-b8ff8.web.app/"
                  className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
                >
                  Find out more
                  <span
                    aria-hidden="true"
                    className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                  >
                    &rarr;
                  </span>
                </a>
              </div>
            </div>
            <div class="xl:w-1/4 md:w-1/2 p-4">
              <div class="bg-gray-100 p-6 rounded-lg">
                <img
                  class="h-40 rounded w-full object-cover object-center mb-6"
                  src={tripsync}
                  alt="content"
                />
                <h2 class="text-lg text-gray-900 font-medium title-font mb-4">
                  TripSync
                </h2>
                <p class="leading-relaxed text-base">
                  TripSync is a one stop travel itenary Web App that simplifies
                  travelling along with user profiles, blogs, etc.
                </p>
                <a
                  href="https://github.com/darshan1137/TripSync"
                  className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
                >
                  Find out more
                  <span
                    aria-hidden="true"
                    className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                  >
                    &rarr;
                  </span>
                </a>
              </div>
            </div>
            <div class="xl:w-1/4 md:w-1/2 p-4">
              <div class="bg-gray-100 p-6 rounded-lg">
                <img
                  class="h-40 rounded w-full object-cover object-center mb-6"
                  src={technotho}
                  alt="content"
                />
                <h2 class="text-lg text-gray-900 font-medium title-font mb-4">
                  Accident Statistics Calculator
                </h2>
                <p class="leading-relaxed text-base">
                  Accident Statistics Calculator provides one stop solution fr
                  accident reports along with various other features.
                </p>
                <a
                  href="https://github.com/darshan1137/"
                  className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
                >
                  Find out more
                  <span
                    aria-hidden="true"
                    className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                  >
                    &rarr;
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Projects;
