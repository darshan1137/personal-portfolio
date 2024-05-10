import React from "react";
import v2v from "../assets/v2v.png";
import vesit from "../assets/VESIT.png";
import coding from "../assets/coding.jpg";

function About() {
  return (
    <div id="about">
      <section class="text-gray-600 body-font ">
        <div class="container px-5 py-5 mx-auto text-center ">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              About Me
            </h1>
            <div class="flex mt-6 justify-center">
              <div class="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
            </div>
          </div>

          <div class="flex items-center lg:w-4/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col pt-10">
            <div class="sm:w-2/5 sm:h-48 h-56 w-full sm:mr-10 inline-flex items-center justify-center flex-shrink-0">
              <img
                alt=""
                src={v2v}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0 sm:w-3/5">
              <h2 class="text-gray-900 text-lg title-font font-medium mb-2">
                Educator and Tech Team Lead - V2V EdTech LLP
              </h2>
              <p class="leading-relaxed text-base">
                <ul class="space-y-4 text-left text-gray-500 dark:text-gray-400 text-justify">
                  <li class="flex items-center space-x-3 rtl:space-x-reverse">
                    <svg
                      class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                    <span>
                      Providing Training and Allotting Tasks to the Tech Team.
                      Supervision and Monitoring work done by the Tech Team.
                    </span>
                  </li>
                  <li class="flex items-center space-x-3 rtl:space-x-reverse">
                    <svg
                      class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                    <span>
                      Conducting daily lectures for Diploma and BSC Students on
                      various Technical Subjects.
                    </span>
                  </li>
                  <li class="flex items-center space-x-3 rtl:space-x-reverse">
                    <svg
                      class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                    <span>Mentoring and Teaching over 500+ students</span>
                  </li>
                </ul>
              </p>
            </div>
          </div>

          <div class="flex items-center lg:w-4/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
            <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h2 class="text-gray-900 text-lg title-font font-medium mb-2">
                Computer Engineering Student - VESIT
              </h2>
              <p class="leading-relaxed text-base">
                <ul class="space-y-4 text-left text-gray-500 dark:text-gray-400">
                  <li class="flex items-center space-x-3 rtl:space-x-reverse">
                    <svg
                      class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                    <span>
                      Pursuing Bachelors of Enginnering from Vivekanand
                      Education Society's Institute of Technology, Mumbai
                    </span>
                  </li>
                  <li class="flex items-center space-x-3 rtl:space-x-reverse">
                    <svg
                      class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                    <span>CGPA until Semester 3 - 9.61</span>
                  </li>
                  <li class="flex items-center space-x-3 rtl:space-x-reverse">
                    <svg
                      class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                    <span>
                      Participation in various Competitions and Technical
                      Workshops
                    </span>
                  </li>
                </ul>
              </p>
            </div>
            <div class="sm:w-2/5 sm:h-48 h-56 w-full inline-flex items-center justify-center  flex-shrink-0 sm:order-none order-first">
              <img
                alt=""
                src={vesit}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
          <div class="flex items-center lg:w-4/5 mx-auto pb-10 mb-10 border-gray-200 sm:flex-row flex-col pt-10">
            <div class="sm:w-2/5 sm:h-48 h-56 w-full sm:mr-10 inline-flex items-center justify-center  flex-shrink-0">
              <img
                alt=""
                src={coding}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0 sm:w-3/5">
              <h2 class="text-gray-900 text-lg title-font font-medium mb-2">
                Founder and Team Lead - Coding Gurus
              </h2>
              <p class="leading-relaxed text-base">
                <ul class="space-y-4 text-left text-gray-500 dark:text-gray-400">
                  <li class="flex items-center space-x-3 rtl:space-x-reverse">
                    <svg
                      class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                    <span>
                      Won 3 Hackathons at Rotacodefest 2024, Technothon 2023 and
                      Technothon 2024
                    </span>
                  </li>
                  <li class="flex items-center space-x-3 rtl:space-x-reverse">
                    <svg
                      class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                    <span>Participation at 8+ Competitions and Hackathons</span>
                  </li>
                  <li class="flex items-center space-x-3 rtl:space-x-reverse">
                    <svg
                      class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                    <span>Team size: 10+</span>
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
