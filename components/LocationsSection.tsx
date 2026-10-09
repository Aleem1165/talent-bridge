import React from "react";

const countries = [
  "USA",
  "Canada",
  "Australia",
  "Europe",
  "Malaysia",
  "Middle East",
  "UK",
];

export default function LocationsSection() {
  return (
    <section className="py-16 md:py-20 relative" id="locations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left">
          <span className="text-xs font-semibold tracking-widest text-[#38bdf8] uppercase">
            LOCATIONS
          </span>
          <h2 className="mt-2 text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Jobs by country
          </h2>
        </div>

        {/* Country Badges (Always single row, scrolls horizontally, never wraps to 2 lines) */}
        <div className="mt-6 sm:mt-8 flex items-center gap-3 overflow-x-auto whitespace-nowrap px-4 -mx-4 sm:px-0 sm:mx-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2">
          {countries.map((country) => (
            <span
              key={country}
              className="px-6 py-2.5 rounded-full text-sm font-medium text-slate-200 border border-slate-800/90 bg-[#0c1629]/70 shrink-0 select-none"
            >
              {country}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
