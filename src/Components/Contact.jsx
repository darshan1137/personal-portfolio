import React, { useState } from "react";
import { db } from "../Firebase/config";
import {
  doc,
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const contactsCollectionRef = collection(db, "contacts");

      // Add a new document to the "contacts" collection
      const docRef = await addDoc(contactsCollectionRef, {
        name,
        email,
        subject,
        message,
      });

      alert("Form Submitted succesfully!");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div>
      <div className="my-6">
        <div className="grid sm:grid-cols-2 items-center gap-16 p-8 mx-auto max-w-4xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md text-[#333] font-[sans-serif]">
          <div>
            <h1 class="text-3xl font-extrabold">Let's Talk</h1>
            <p class="text-sm text-gray-400 mt-3">
              Have some big idea or brand to develop and need help? Then reach
              out we'd love to hear about your project and provide help.
            </p>
            <div class="mt-12">
              <h2 class="text-lg font-extrabold">Email</h2>
              <ul class="mt-3">
                <li class="flex items-center">
                  <div class="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      fill="#007bff"
                      viewBox="0 0 479.058 479.058"
                    >
                      <path
                        d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                        data-original="#000000"
                      />
                    </svg>
                  </div>
                  <a
                    target="blank"
                    href="mailto:darshankhapekar8520@gmail.com"
                    class="text-[#007bff] text-sm ml-3"
                  >
                    <small class="block">Mail</small>
                    <strong>darshankhapekar8520@gmail.com</strong>
                  </a>
                </li>
              </ul>
            </div>
            <div class="mt-12">
              <h2 class="text-lg font-extrabold">Socials</h2>
              <ul class="flex mt-3 space-x-4">
                <li class="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <a href="https://github.com/darshan1137">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        fill="#007bff"
                        d="M12 0C5.371 0 0 5.373 0 12c0 5.303 3.438 9.798 8.207 11.385.6.111.82-.26.82-.578 0-.286-.01-1.041-.015-2.042-3.338.724-4.042-1.612-4.042-1.612C4.328 18.062 3.563 17.7 3.563 17.7c-1.087-.743.083-.728.083-.728 1.205.086 1.838 1.24 1.838 1.24 1.07 1.833 2.807 1.303 3.493.998.108-.775.415-1.303.754-1.605-2.648-.3-5.44-1.324-5.44-5.89 0-1.302.465-2.367 1.234-3.202-.124-.303-.536-1.517.116-3.16 0 0 1.005-.32 3.3 1.227a11.49 11.49 0 0 1 3-.405 11.49 11.49 0 0 1 3 .405c2.292-1.547 3.297-1.227 3.297-1.227.656 1.643.242 2.857.118 3.16.77.835 1.232 1.9 1.232 3.202 0 4.578-2.795 5.585-5.451 5.881.428.369.812 1.097.812 2.213 0 1.598-.015 2.883-.015 3.281 0 .319.213.694.825.577C20.565 21.794 24 17.298 24 12c0-6.627-5.373-12-12-12z"
                      />
                    </svg>
                  </a>
                </li>
                <li class="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <a href="https://www.linkedin.com/in/darshankhapekar/">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      fill="#007bff"
                      viewBox="0 0 511 512"
                    >
                      <path
                        d="M111.898 160.664H15.5c-8.285 0-15 6.719-15 15V497c0 8.285 6.715 15 15 15h96.398c8.286 0 15-6.715 15-15V175.664c0-8.281-6.714-15-15-15zM96.898 482H30.5V190.664h66.398zM63.703 0C28.852 0 .5 28.352.5 63.195c0 34.852 28.352 63.2 63.203 63.2 34.848 0 63.195-28.352 63.195-63.2C126.898 28.352 98.551 0 63.703 0zm0 96.395c-18.308 0-33.203-14.891-33.203-33.2C30.5 44.891 45.395 30 63.703 30c18.305 0 33.195 14.89 33.195 33.195 0 18.309-14.89 33.2-33.195 33.2zm289.207 62.148c-22.8 0-45.273 5.496-65.398 15.777-.684-7.652-7.11-13.656-14.942-13.656h-96.406c-8.281 0-15 6.719-15 15V497c0 8.285 6.719 15 15 15h96.406c8.285 0 15-6.715 15-15V320.266c0-22.735 18.5-41.23 41.235-41.23 22.734 0 41.226 18.495 41.226 41.23V497c0 8.285 6.719 15 15 15h96.403c8.285 0 15-6.715 15-15V302.066c0-79.14-64.383-143.523-143.524-143.523zM466.434 482h-66.399V320.266c0-39.278-31.953-71.23-71.226-71.23-39.282 0-71.239 31.952-71.239 71.23V482h-66.402V190.664h66.402v11.082c0 5.77 3.309 11.027 8.512 13.524a15.01 15.01 0 0 0 15.875-1.82c20.313-16.294 44.852-24.907 70.953-24.907 62.598 0 113.524 50.926 113.524 113.523zm0 0"
                        data-original="#000000"
                      />
                    </svg>
                  </a>
                </li>
                <li class="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <a href="https://www.instagram.com/darshan.1137/">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      fill="#007bff"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 9.3a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm0-1.8a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm5.85-.225a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0ZM12 4.8c-2.227 0-2.59.006-3.626.052-.706.034-1.18.128-1.618.299a2.59 2.59 0 0 0-.972.633 2.601 2.601 0 0 0-.634.972c-.17.44-.265.913-.298 1.618C4.805 9.367 4.8 9.714 4.8 12c0 2.227.006 2.59.052 3.626.034.705.128 1.18.298 1.617.153.392.333.674.632.972.303.303.585.484.972.633.445.172.918.267 1.62.3.993.047 1.34.052 3.626.052 2.227 0 2.59-.006 3.626-.052.704-.034 1.178-.128 1.617-.298.39-.152.674-.333.972-.632.304-.303.485-.585.634-.972.171-.444.266-.918.299-1.62.047-.993.052-1.34.052-3.626 0-2.227-.006-2.59-.052-3.626-.034-.704-.128-1.18-.299-1.618a2.619 2.619 0 0 0-.633-.972 2.595 2.595 0 0 0-.972-.634c-.44-.17-.914-.265-1.618-.298-.993-.047-1.34-.052-3.626-.052ZM12 3c2.445 0 2.75.009 3.71.054.958.045 1.61.195 2.185.419A4.388 4.388 0 0 1 19.49 4.51c.457.45.812.994 1.038 1.595.222.573.373 1.227.418 2.185.042.96.054 1.265.054 3.71 0 2.445-.009 2.75-.054 3.71-.045.958-.196 1.61-.419 2.185a4.395 4.395 0 0 1-1.037 1.595 4.44 4.44 0 0 1-1.595 1.038c-.573.222-1.227.373-2.185.418-.96.042-1.265.054-3.71.054-2.445 0-2.75-.009-3.71-.054-.958-.045-1.61-.196-2.185-.419A4.402 4.402 0 0 1 4.51 19.49a4.414 4.414 0 0 1-1.037-1.595c-.224-.573-.374-1.227-.419-2.185C3.012 14.75 3 14.445 3 12c0-2.445.009-2.75.054-3.71s.195-1.61.419-2.185A4.392 4.392 0 0 1 4.51 4.51c.45-.458.994-.812 1.595-1.037.574-.224 1.226-.374 2.185-.419C9.25 3.012 9.555 3 12 3Z"></path>
                    </svg>
                  </a>
                </li>
                <li class="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <a href="https://www.youtube.com/channel/UCrDsxOJtJAMgyrpW_T1b0sQ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        fill="#007bff"
                        d="M23.9 7.5s-.2-1.6-1.1-2.5c-1.1-1.1-2.3-1.1-2.5-1.2C18.6 4 12 4 12 4s-6.6 0-8.3.2c-.2 0-1.4.1-2.5 1.2-1 1-1.1 2.5-1.1 2.5S0 9.5 0 11.5v1.9c0 2 1 3 1 3s.2 1.5 1.1 2.5c1.1 1.1 2.5 1.1 3.2 1.3C6.7 20 12 20 12 20s6.6 0 8.3-.2c.2 0 1.4-.1 2.5-1.2 1-1 1.1-2.5 1.1-2.5s1-1 1-3v-1.9c0-2-.1-3-1-3zm-16 7V9.5l6 3-6 3z"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <form className="ml-auo space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              placeholder="Message"
              rows="6"
              className="w-full rounded-md px-4 border text-sm pt-2.5 outline-[#007bff]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="text-white bg-[#007bff] hover:bg-blue-600 font-semibold rounded-md text-sm px-4 py-2.5 w-full"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
