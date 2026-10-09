"use client";

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { usePostJobModal } from "@/context/PostJobModalContext";

export default function Footer() {
  const { openPostJobModal } = usePostJobModal();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollTo = (targetId: string, offset = 90) => {
    const el = document.getElementById(targetId);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <footer className="mt-12 border-t border-slate-800/80 bg-[#040813] text-slate-400 text-sm" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <button
              type="button"
              onClick={handleScrollToTop}
              className="inline-block text-xl font-bold tracking-tight cursor-pointer text-left"
            >
              <span className="text-white">Talent</span>
              <span className="text-[#3b82f6]">Bridge</span>
              <span className="text-white font-semibold">&nbsp;Hiring</span>
            </button>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Your next opportunity to go Abroad Awaits. <br />
              Connecting talent with opportunity.
            </p>
          </div>

          {/* Job Seekers */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-semibold text-sm">Job Seekers</h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={() => handleScrollTo("find-jobs", 110)}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Browse Jobs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleScrollTo("how-it-works", 90)}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleScrollTo("locations", 90)}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Jobs by Country
                </button>
              </li>
            </ul>
          </div>

          {/* Employers */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-semibold text-sm">Employers</h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={openPostJobModal}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Post a Job
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleScrollTo("employers", 90)}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Hire Talent
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-white font-semibold text-sm">Contact</h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:Talentbridgehiring@gmail.com"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Talentbridgehiring@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+19296127272"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>+1 929 612 7272</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Brooklyn, Brooklyn, NY, United States, 11206</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 text-xs text-slate-500">
          <p>© 2026 Talent Bridge Hiring. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
