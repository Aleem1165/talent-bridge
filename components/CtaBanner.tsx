"use client";

import React from "react";
import { usePostJobModal } from "@/context/PostJobModalContext";

export default function CtaBanner() {
  const { openPostJobModal } = usePostJobModal();

  return (
    <section className="py-12 relative" id="employers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#1d63ed] via-[#2563eb] to-[#38bdf8] py-5 px-4 sm:p-12 md:p-14 shadow-2xl shadow-blue-500/20">
          {/* Subtle background decoration */}
          <div className="absolute -right-12 -bottom-12 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-60 h-60 rounded-full bg-cyan-300/10 blur-xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 lg:gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                Hiring? Meet your next great team member.
              </h2>
              <p className="mt-2 sm:mt-3 text-xs sm:text-base text-blue-50/90 leading-relaxed font-normal">
                Post openings, review qualified candidates and build your team with a partner that understands the local market.
              </p>
            </div>

            <div className="shrink-0 w-full lg:w-auto">
              <button
                type="button"
                onClick={openPostJobModal}
                className="w-full lg:w-auto inline-flex items-center justify-center px-6 py-2.5 sm:px-7 sm:py-3.5 rounded-xl bg-[#070e1c] hover:bg-[#13223f] text-white text-sm font-semibold transition-colors duration-200 shadow-xl cursor-pointer"
              >
                Post a Job
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
