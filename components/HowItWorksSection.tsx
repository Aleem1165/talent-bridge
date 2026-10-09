import React from "react";

interface Step {
  step: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    step: "01",
    title: "Create your profile",
    description:
      "Add your skills, experience and goals so employers can find you.",
  },
  {
    step: "02",
    title: "Discover and apply",
    description:
      "Search roles by title, industry or city and apply in a few clicks.",
  },
  {
    step: "03",
    title: "Get hired",
    description:
      "Connect with employers, interview and start your next chapter.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="pt-6 pb-20 md:pt-8 md:pb-24 relative" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest text-[#38bdf8] uppercase">
            HOW IT WORKS
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Three steps to your next role
          </h2>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((item) => (
            <div
              key={item.step}
              className="bg-[#0c1629] border border-slate-800/80 rounded-2xl p-5 sm:p-8 flex flex-col justify-between"
            >
              <div>
                {/* Number */}
                <div className="text-2xl sm:text-4xl font-black text-[#1d68f2] mb-2.5 sm:mb-6 tracking-tight">
                  {item.step}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-2 sm:mt-3 text-sm text-slate-400 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
