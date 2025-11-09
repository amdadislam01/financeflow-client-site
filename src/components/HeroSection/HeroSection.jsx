import React from "react";
import { FaArrowRight } from "react-icons/fa";
import bannerImage from '/banner.png'
import { Link } from "react-router";

const HeroSection = () => {
  return (
    <section className="relative h-[85vh] flex items-center justify-center text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transform scale-110 animate-zoomSlow"
        style={{
          backgroundImage: `url(${bannerImage})`
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-teal-800/60 to-transparent"></div>

      <div className="relative z-10 max-w-3xl text-center px-6 animate-fadeIn">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
          Build Your{" "}
          <span className="text-teal-400 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-green-400 animate-textGradient">
            Financial Freedom
          </span>{" "}
          — One Step at a Time
        </h1>

        <p className="text-lg sm:text-xl text-gray-200 mb-8">
          “Success isn’t about how much money you make, it’s about the freedom
          you create. Stay consistent, keep learning, and let your money work
          for you.”
        </p>

        <div className="flex justify-center gap-4">
          <Link to={'/add-transaction'} className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 rounded-full text-white font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
            Get Started <FaArrowRight />
          </Link>

          <button className="px-6 py-3 border border-white rounded-full text-white font-semibold hover:bg-white hover:text-teal-700 transition-all duration-300 cursor-pointer">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
