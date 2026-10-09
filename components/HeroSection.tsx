"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, MapPin } from "lucide-react";

export default function HeroSection() {
  const [jobQuery, setJobQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const popularTags = [
    "Software",
    "Accounting",
    "Sales",
    "Engineering",
    "Healthcare",
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching jobs:", { jobQuery, locationQuery });
  };

  return (
    <section className="relative pt-12 pb-2 md:pt-20 md:pb-10 overflow-hidden" id="find-jobs">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-6 lg:gap-x-8 items-center">
          {/* Top Heading & Intro (Desktop Left Col Row 1, Mobile 1st) */}
          <div className="md:col-span-7 md:row-start-1 flex flex-col">
            {/* Tag Badge */}
            <div className="inline-flex items-center self-start px-4 py-1.5 rounded-full bg-[#0d1a33] border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm">
              THE WORLD&apos;S NEW CAREER PLATFORM
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-tight sm:leading-[1.15]">
              Your next <br />
              <span className="whitespace-nowrap">opportunity to go</span> <br />
              <span className="text-[#38bdf8] drop-shadow-[0_0_20px_rgba(56,189,248,0.35)]">
                Abroad Awaits
              </span>
            </h1>

            {/* Description */}
            <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              Talent Bridge Hiring connects skilled professionals with trusted employers across all over the world. Search roles, apply with confidence, and get hired with your talent faster.
            </p>
          </div>

          {/* Logo & Motive (Desktop Right Col Rows 1-2, Mobile 2nd - above search section) */}
          <div className="md:col-span-5 md:col-start-8 md:row-start-1 md:row-span-2 flex justify-center md:justify-end self-center my-2 md:my-0">
            <div className="w-full max-w-md p-2 sm:p-4 md:p-4 lg:p-6 flex flex-col items-center justify-center text-center relative">
              {/* Logo */}
              <div className="relative flex items-center justify-center">
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-56 md:h-56 lg:w-72 lg:h-72 rounded-full overflow-hidden flex items-center justify-center drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)]">
                  <Image
                    src="/assets/images/logo.png"
                    alt="Talent Bridge Hiring Logo"
                    width={320}
                    height={320}
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Our Motive */}
              <div className="mt-6 md:mt-8 flex flex-col items-center">
                <span className="text-xs font-semibold tracking-[0.25em] text-slate-400 uppercase">
                  OUR MOTIVE
                </span>
                <span className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#00e5ff] tracking-wide drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                  “TO BE HONEST”
                </span>
              </div>
            </div>
          </div>

          {/* Search Section & Tags (Desktop Left Col Row 2, Mobile 3rd - below logo) */}
          <div className="md:col-span-7 md:row-start-2 flex flex-col">
            {/* Search Input Box */}
            <form
              id="job-search-box"
              onSubmit={handleSearch}
              className="bg-[#0c1629]/95 backdrop-blur-md border border-slate-800 rounded-2xl p-2 sm:p-2.5 shadow-2xl flex flex-col sm:flex-row items-stretch gap-2.5"
            >
              {/* Job title input */}
              <div className="flex-1 flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#070e1c] border border-slate-800/80 focus-within:border-blue-500/80 transition">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={jobQuery}
                  onChange={(e) => setJobQuery(e.target.value)}
                  placeholder="Job title or keyword"
                  className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              {/* City input */}
              <div className="flex-1 flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#070e1c] border border-slate-800/80 focus-within:border-blue-500/80 transition">
                <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="City, e.g. New York"
                  className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="px-7 py-3 rounded-xl bg-[#1d68f2] hover:bg-[#1656cc] text-white font-medium text-sm transition-colors duration-200 shadow-md shadow-blue-500/25 shrink-0 cursor-pointer"
              >
                Search Jobs
              </button>
            </form>

            {/* Popular Searches */}
            <div className="mt-4 flex items-center gap-2 text-xs sm:text-sm text-slate-400 overflow-x-auto md:overflow-visible md:flex-wrap whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1 md:pb-0">
              <span className="text-slate-300 font-medium shrink-0">Popular:</span>
              {popularTags.map((tag, idx) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setJobQuery(tag)}
                  className="hover:text-blue-400 transition-colors cursor-pointer shrink-0"
                >
                  {tag}
                  {idx < popularTags.length - 1 && <span className="ml-1 text-slate-500">,</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
