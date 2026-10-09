"use client";

import React, { useState } from "react";

interface Category {
  code: string;
  title: string;
  description: string;
}

const categories: Category[] = [
  {
    code: "IT",
    title: "Technology",
    description: "Software, data and support roles",
  },
  {
    code: "FN",
    title: "Finance & Accounting",
    description: "Banking, audit and accounts",
  },
  {
    code: "EN",
    title: "Engineering",
    description: "Civil, electrical and mechanical",
  },
  {
    code: "HC",
    title: "Healthcare",
    description: "Clinical and administrative",
  },
  {
    code: "SM",
    title: "Sales & Marketing",
    description: "Growth, brand and field sales",
  },
  {
    code: "ED",
    title: "Education",
    description: "Teaching and training",
  },
  {
    code: "HR",
    title: "HR & Admin",
    description: "People, operations and office",
  },
  {
    code: "MF",
    title: "Manufacturing",
    description: "Production, quality and supply chain",
  },
];

// 4 slides of 2 categories each for 2-line layout
const slides = [
  [categories[0], categories[1]],
  [categories[2], categories[3]],
  [categories[4], categories[5]],
  [categories[6], categories[7]],
];

export default function CategoriesSection() {
  const [index, setIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDelta, setTouchDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleStart = (clientX: number) => {
    setTouchStartX(clientX);
    setTouchDelta(0);
    setIsDragging(true);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || touchStartX === null) return;
    setTouchDelta(clientX - touchStartX);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    if (touchDelta < -40) {
      setIndex((prev) => prev + 1);
    } else if (touchDelta > 40) {
      setIndex((prev) => prev - 1);
    }
    setTouchStartX(null);
    setTouchDelta(0);
    setIsDragging(false);
  };

  const activeDot = ((index % slides.length) + slides.length) % slides.length;

  const goToSlide = (dotIdx: number) => {
    let diff = dotIdx - activeDot;
    if (diff > slides.length / 2) diff -= slides.length;
    if (diff < -slides.length / 2) diff += slides.length;
    setIndex((prev) => prev + diff);
  };

  // 5 virtual slots centered around current `index`: [-2, -1, 0, 1, 2]
  const visibleOffsets = [-2, -1, 0, 1, 2];

  return (
    <section className="pt-1 pb-8 md:pt-6 md:pb-12 relative select-none" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 md:mb-12">
          {/* Top Label Row: BROWSE BY INDUSTRY with View All Jobs opposite it on mobile */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-widest text-[#38bdf8] uppercase">
              BROWSE BY INDUSTRY
            </span>
            {/* Mobile View All Jobs text with underline */}
            <button
              type="button"
              className="md:hidden text-xs font-semibold text-[#38bdf8] hover:text-cyan-300 underline underline-offset-4 cursor-pointer transition-colors"
            >
              View All Jobs
            </button>
          </div>

          {/* Headline and Desktop Button */}
          <div className="mt-2 flex items-center justify-center md:justify-between gap-4">
            <h2 className="text-[22px] xs:text-[22px] sm:text-3xl md:text-4xl font-bold text-white tracking-tight whitespace-nowrap text-center md:text-left">
              Explore career categories
            </h2>

            {/* Desktop View All Jobs Button */}
            <button
              type="button"
              className="hidden md:inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-medium text-white border border-slate-700/90 hover:border-slate-500 bg-[#0c1629]/50 hover:bg-[#13223f] transition-all duration-200 cursor-pointer shrink-0"
            >
              View All Jobs
            </button>
          </div>
        </div>

        {/* 2-line Infinite 3D Layered Touch Carousel (shown below lg: 1024px) */}
        <div
          className="lg:hidden relative w-full h-[270px] sm:h-[310px] overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
          onTouchStart={(e) => handleStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          onTouchEnd={handleEnd}
          onMouseDown={(e) => handleStart(e.clientX)}
          onMouseMove={(e) => handleMove(e.clientX)}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
        >
          {visibleOffsets.map((offset) => {
            const v = index + offset;
            const slideIdx = ((v % slides.length) + slides.length) % slides.length;
            const pair = slides[slideIdx];

            const isCenter = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;

            const baseTranslatePercent = offset * 82;
            const dragOffsetPx = isDragging ? touchDelta * 0.4 : 0;

            let scale = 0.76;
            let opacity = 0;
            let zIndex = 0;

            if (isCenter) {
              scale = 1;
              opacity = 1;
              zIndex = 30;
            } else if (isLeft || isRight) {
              scale = 0.88;
              opacity = 0.45;
              zIndex = 10;
            }

            return (
              <div
                key={v}
                onClick={() => {
                  if (Math.abs(touchDelta) < 10) {
                    if (isLeft) setIndex((prev) => prev - 1);
                    if (isRight) setIndex((prev) => prev + 1);
                  }
                }}
                style={{
                  transform: `translateX(calc(-50% + ${baseTranslatePercent}% + ${dragOffsetPx}px)) scale(${scale})`,
                  opacity,
                  zIndex,
                  pointerEvents: Math.abs(offset) <= 1 ? "auto" : "none",
                  transition: isDragging
                    ? "none"
                    : "transform 350ms cubic-bezier(0.25, 1, 0.5, 1), opacity 350ms ease-out",
                }}
                className={`absolute top-0 left-1/2 w-[78vw] max-w-[320px] sm:max-w-[450px] flex flex-col gap-2.5 sm:gap-3 ${
                  !isCenter ? "cursor-pointer" : ""
                }`}
              >
                {pair.map((cat) => (
                  <div
                    key={cat.code}
                    className="bg-[#0c1629] border border-slate-800/90 rounded-2xl p-3.5 sm:p-4.5 shadow-xl flex flex-col justify-between"
                  >
                    <div>
                      {/* Code badge */}
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#070e1c] border border-blue-500/30 flex items-center justify-center text-[11px] sm:text-xs font-bold text-[#38bdf8] tracking-wider mb-2.5 sm:mb-3">
                        {cat.code}
                      </div>

                      {/* Category title */}
                      <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                        {cat.title}
                      </h3>

                      {/* Description */}
                      <p className="mt-1 text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Carousel Indicators (4 subtle dots, no buttons) */}
        <div className="lg:hidden flex items-center justify-center gap-1.5 mt-2 sm:mt-4">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeDot === i ? "w-5 bg-[#38bdf8]" : "w-1.5 bg-slate-700 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>

        {/* Desktop View: Strictly 4-column x 2-row grid (2 lines only) */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.code}
              className="group bg-[#0c1629] hover:bg-[#0f1d38] border border-slate-800/80 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(29,104,242,0.12)] cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Code badge */}
                <div className="w-10 h-10 rounded-xl bg-[#070e1c] border border-blue-500/30 flex items-center justify-center text-xs font-bold text-[#38bdf8] tracking-wider mb-5 group-hover:border-blue-400 group-hover:scale-105 transition">
                  {cat.code}
                </div>

                {/* Category title */}
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {cat.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm text-slate-400 leading-relaxed font-normal">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
