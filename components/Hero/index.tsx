"use client";
import Image from "next/image";
import { useState } from "react";

const Hero = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex lg:items-center lg:gap-8 xl:gap-32.5">
            <div className=" md:w-1/2">
              <h1 className="mb-4.5 text-2xl font-semibold text-black dark:text-white">
                Synergi Solutions
              </h1>
              <h1 className="mb-5 pr-16 text-3xl font-bold text-black dark:text-white xl:text-hero ">
                Smart Solutions for a Profitable Healthcare Business
                {/* <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark ">
                  SaaS
                </span> */}
              </h1>
              <p>
                We help you boost efficiencies, reputation, savings, quality,
                and profitability in the healthcare arenas
              </p>

              {/* <div className="mt-10">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap gap-5">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      placeholder="Enter your email address"
                      className="rounded-full border border-stroke px-6 py-2.5 shadow-solid-2 focus:border-primary focus:outline-none dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-primary"
                    />
                    <button
                      aria-label="get started button"
                      className="flex rounded-full bg-black px-7.5 py-2.5 text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
                    >
                      Get Started
                    </button>
                  </div>
                </form>

                <p className="mt-5 text-black dark:text-white"></p>
              </div> */}
            </div>

            <div className="relative aspect-[900/444] w-full">
              {/* Background Gradient Circles */}
              <div className="absolute inset-0 -z-10">
                {/* Circle 1 (Top Left - Purple) */}
                <div className="absolute top-[-50px] left-[400px] h-[250px] w-[250px] rounded-full bg-purple-400 opacity-30 blur-3xl"></div>

                {/* Circle 2 (Center - Blue) */}
                <div className="absolute top-[220px] left-[0px] h-[300px] w-[300px] rounded-full bg-blue-500 opacity-20 blur-3xl"></div>

                {/* Circle 3 (Bottom Right - Pink) */}
                <div className="absolute bottom-[-50px] right-[-130px] h-[280px] w-[280px] rounded-full bg-pink-500 opacity-20 blur-3xl"></div>
              </div>

              {/* Video Section */}
              <video
                style={{ borderRadius: "20px" }}
                preload="auto"
                autoPlay
                loop
                playsInline
                muted
                controls
                width="600"
              >
                <source src="/images/hero/heroSection.mp4" type="video/mp4" />
              </video>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
