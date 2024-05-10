import React from "react";
import banner from "../assets/banner.svg";
import darshan from "../assets/darshan.svg";
import video from "../assets/banner_video.mp4";

function Banner() {
  return (
    <div>
      <section className="relative bg-cover bg-center h-[70vh]">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          style={{ opacity: 0.78 }}
        >
          <source src={video} type="video/mp4" />
        </video>
        <div className="absolute top-0 w-full text-center">
          <div className="flex flex-wrap pt-10 md:pt-44">
            <div className="mx-auto font-serif subpixel-antialiased italic font-black text-7xl md:pr-4 ">
              DARSHAN
            </div>
            <div className="mx-auto font-serif subpixel-antialiased italic font-black text-7xl md:pl-4 ">
              KHAPEKAR
            </div>
          </div>
        </div>
        <img
          alt=""
          src={darshan}
          className="mx-auto object-cover sm:h-64 lg:h-96"
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </section>
    </div>
  );
}

export default Banner;
