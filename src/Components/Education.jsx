import React from "react";

function Education() {
  return (
    <div>
      <section className="text-gray-600 body-font sm:px-24 border-grey-200 border-b pb-10">
        <div className="container px-5 mx-auto">
          <div className="text-center mb-20">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Education
              </h1>
            </div>
            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
            </div>
          </div>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6 md:flex-row flex-col">
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                <img
                  alt=""
                  src="https://pbs.twimg.com/profile_images/595654181496758274/OSSJy-OY_400x400.jpg"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  BE in Computer Engineering <br />
                  VES Institute of Technology
                </h2>
                <p className="leading-relaxed text-base">
                  <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 text-left">
                    <li>Currently a Third Year Student</li>
                    <li>GCPA (till Semester 3) - 9.61</li>
                  </ul>
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                <img
                  alt=""
                  src="https://vpt.edu.in/diploma/polytechnic/images/vpbuilding.jpeg"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  Diploma in Information Technolgy
                  <br /> Vidyalankar Polytechnic, Wadala
                </h2>
                <p className="leading-relaxed text-base">
                  <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 text-left">
                    <li>Secured 90 in Sem 5 and 91.57 in Sem 6</li>
                    <li>Conducted and managed various Technical Events</li>
                  </ul>
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                <img
                  alt=""
                  src="https://stthomashighschool.org/assets/images/vision.jpg"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  Second School Certificate <br /> St. Thomas High School
                </h2>
                <p className="leading-relaxed text-base">
                  <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 text-left">
                    <li>Secured 87% with 97% in Mathematics</li>
                    <li>
                      Participation in various extra-curricular activities
                    </li>
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Education;
