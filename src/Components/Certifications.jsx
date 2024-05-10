import React from "react";
import cprog from "../assets/c-programming.jpg";
// import coordinator from "../assests/cord.jpg";
import head from "../assets/head.jpg";
import proj from "../assets/ieee-proj.jpg";
import intern from "../assets/intern.jpg";
import state from "../assets/state-level.jpg";

function Certifications() {
  return (
    <div>
      <section class="text-gray-600 body-font ">
        <div class="container px-5 py-10 mx-auto sm:px-24">
          <div className="text-center mb-5">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Certificates
              </h1>
            </div>
            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
            </div>
          </div>
          <div class="flex flex-wrap -m-4">
            <div class="p-4 lg:w-1/3">
              <article className="group">
                <img
                  alt=""
                  src={cprog}
                  className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
                />

                <div className="p-4">
                  <a href="#">
                    <h3 className="text-lg font-medium text-gray-900">
                      Finding the Journey to Mordor
                    </h3>
                  </a>
                </div>
              </article>
            </div>
            <div class="p-4 lg:w-1/3">
              <article className="group">
                <img
                  alt=""
                  src={head}
                  className="h-56 w-full rounded-xl object-contain shadow-xl transition group-hover:grayscale-[50%]"
                />

                <div className="p-4">
                  <a href="#">
                    <h3 className="text-lg font-medium text-gray-900">
                      Finding the Journey to Mordor
                    </h3>
                  </a>

                  <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Recusandae dolores, possimus pariatur animi temporibus
                    nesciunt praesentium dolore sed nulla ipsum eveniet corporis
                    quidem, mollitia itaque minus soluta, voluptates neque
                    explicabo tempora nisi culpa eius atque dignissimos.
                    Molestias explicabo corporis voluptatem?
                  </p>
                </div>
              </article>
            </div>
            <div class="p-4 lg:w-1/3">
              <article className="group">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
                />

                <div className="p-4">
                  <a href="#">
                    <h3 className="text-lg font-medium text-gray-900">
                      Finding the Journey to Mordor
                    </h3>
                  </a>

                  <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Recusandae dolores, possimus pariatur animi temporibus
                    nesciunt praesentium dolore sed nulla ipsum eveniet corporis
                    quidem, mollitia itaque minus soluta, voluptates neque
                    explicabo tempora nisi culpa eius atque dignissimos.
                    Molestias explicabo corporis voluptatem?
                  </p>
                </div>
              </article>
            </div>
            <div class="p-4 lg:w-1/3">
              <article className="group">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
                />

                <div className="p-4">
                  <a href="#">
                    <h3 className="text-lg font-medium text-gray-900">
                      Finding the Journey to Mordor
                    </h3>
                  </a>

                  <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Recusandae dolores, possimus pariatur animi temporibus
                    nesciunt praesentium dolore sed nulla ipsum eveniet corporis
                    quidem, mollitia itaque minus soluta, voluptates neque
                    explicabo tempora nisi culpa eius atque dignissimos.
                    Molestias explicabo corporis voluptatem?
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Certifications;
