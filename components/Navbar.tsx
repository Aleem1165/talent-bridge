"use client";

import React, { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePostJobModal } from "@/context/PostJobModalContext";

export default function Navbar() {
  const { openPostJobModal } = usePostJobModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Close mobile menu on outside click, touch, Escape key, or screen resize
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 500) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Find Jobs", targetId: "job-search-box", offset: 85 },
    { label: "How It Works", targetId: "how-it-works", offset: 85 },
    { label: "For Employers", targetId: "employers", offset: 85 },
    { label: "Locations", targetId: "locations", offset: 85 },
    { label: "Contact", targetId: "contact", offset: 85 },
  ];

  const handleScrollTo = (targetId: string, offset = 85) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      }
    }, 20);
  };

  const handleLogoClick = () => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050b18]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={handleLogoClick}
          aria-label="TalentBridge Hiring"
          title="TalentBridge Hiring"
          className="flex items-center gap-2 group cursor-pointer text-left shrink-0"
        >
          {/* Full Brand Name on mobile (< 500px with hamburger) and large screens (>= 820px) */}
          <span className="inline-flex min-[500px]:hidden min-[820px]:inline-flex items-center text-xl sm:text-2xl font-bold tracking-tight whitespace-nowrap">
            <span className="text-white">Talent</span>
            <span className="text-[#3b82f6]">Bridge</span>
            <span className="text-white font-semibold">&nbsp;Hiring</span>
          </span>

          {/* Compact TBH monogram ONLY between 500px and 819px where all desktop links & buttons share the bar */}
          <span className="hidden min-[500px]:inline-flex min-[820px]:hidden items-center text-xl sm:text-2xl font-bold tracking-tight whitespace-nowrap">
            <span className="text-white">T</span>
            <span className="text-[#3b82f6]">B</span>
            <span className="text-white font-semibold">H</span>
          </span>
        </button>

        {/* Desktop Navigation Links (Shown on min-[500px]+) */}
        <nav className="hidden min-[500px]:flex items-center gap-1.5 min-[580px]:gap-2.5 md:gap-3.5 lg:gap-6 xl:gap-7 2xl:gap-8 text-[10px] min-[580px]:text-[11px] md:text-xs lg:text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => handleScrollTo(link.targetId, link.offset)}
              className="relative py-1.5 whitespace-nowrap hover:text-white transition-colors duration-200 group cursor-pointer text-[10px] min-[580px]:text-[11px] md:text-xs lg:text-sm font-medium text-slate-300"
            >
              <span>{link.label}</span>
              {/* Animated underline in button color */}
              <span className="absolute bottom-0 left-0 w-0 h-[2.5px] bg-[#1d68f2] rounded-full transition-all duration-300 ease-out group-hover:w-full shadow-[0_0_8px_rgba(29,104,242,0.6)]" />
            </button>
          ))}
        </nav>

        {/* Desktop Action Buttons (Shown on min-[500px]+) */}
        <div className="hidden min-[500px]:flex items-center gap-1.5 md:gap-2 lg:gap-2.5 xl:gap-3 shrink-0">
          <button
            type="button"
            className="inline-flex items-center justify-center px-2 min-[580px]:px-2.5 md:px-3.5 lg:px-4 xl:px-5 py-1 min-[580px]:py-1.5 sm:py-2 xl:py-2.5 rounded-lg min-[580px]:rounded-xl text-[10px] min-[580px]:text-[11px] md:text-xs lg:text-sm font-medium text-white border border-slate-700/90 hover:border-slate-500 bg-[#0c1629]/50 hover:bg-[#13223f] transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={openPostJobModal}
            className="inline-flex items-center justify-center px-2 min-[580px]:px-2.5 md:px-3.5 lg:px-4 xl:px-5 py-1 min-[580px]:py-1.5 sm:py-2 xl:py-2.5 rounded-lg min-[580px]:rounded-xl text-[10px] min-[580px]:text-[11px] md:text-xs lg:text-sm font-semibold text-white bg-[#1d68f2] hover:bg-[#1656cc] transition-colors duration-200 cursor-pointer whitespace-nowrap"
          >
            Post a Job
          </button>
        </div>

        {/* Hamburger Button (Shows only below 500px) */}
        <button
          ref={toggleButtonRef}
          type="button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="min-[500px]:hidden relative w-10 h-10 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors flex items-center justify-center cursor-pointer overflow-hidden"
        >
          <Menu
            className={`w-6 h-6 absolute transition-all duration-300 ease-in-out ${
              mobileMenuOpen
                ? "opacity-0 rotate-90 scale-75 pointer-events-none"
                : "opacity-100 rotate-0 scale-100 pointer-events-auto"
            }`}
          />
          <X
            className={`w-6 h-6 absolute transition-all duration-300 ease-in-out ${
              mobileMenuOpen
                ? "opacity-100 rotate-0 scale-100 pointer-events-auto"
                : "opacity-0 -rotate-90 scale-75 pointer-events-none"
            }`}
          />
        </button>
      </div>

      {/* Backdrop overlay for outside click / touch */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden={!mobileMenuOpen}
        className={`fixed inset-0 top-20 bg-black/60 backdrop-blur-xs z-40 min-[500px]:hidden cursor-pointer transition-opacity duration-300 ease-in-out ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile/Tablet Menu Dropdown */}
      <div
        ref={menuRef}
        aria-hidden={!mobileMenuOpen}
        className={`min-[500px]:hidden absolute top-full left-0 right-0 w-full border-b border-slate-800 bg-[#050b18]/98 backdrop-blur-xl shadow-2xl z-50 transition-all duration-300 ease-in-out origin-top transform ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto visible"
            : "opacity-0 -translate-y-4 pointer-events-none invisible"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => handleScrollTo(link.targetId, link.offset)}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 cursor-pointer transition-colors duration-150"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-4 border-t border-slate-800 flex flex-col min-[360px]:flex-row min-[360px]:items-center min-[360px]:justify-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full min-[360px]:w-auto min-[360px]:min-w-[130px] px-6 text-center py-2.5 rounded-xl text-sm font-medium text-white border border-slate-700/90 hover:border-slate-500 bg-[#0c1629]/50 transition cursor-pointer whitespace-nowrap"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openPostJobModal();
              }}
              className="w-full min-[360px]:w-auto min-[360px]:min-w-[130px] px-6 text-center py-2.5 rounded-xl text-sm font-semibold bg-[#1d68f2] hover:bg-[#1656cc] text-white transition-colors duration-200 cursor-pointer whitespace-nowrap"
            >
              Post a Job
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
