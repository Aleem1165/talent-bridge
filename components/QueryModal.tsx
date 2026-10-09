"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, CheckCircle2, Upload, AlertCircle, Loader2, FileText } from "lucide-react";

interface QueryFormData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phone: string;
  address: string;
}

export default function QueryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<QueryFormData>({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    phone: "",
    address: "",
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string>("");
  const [formError, setFormError] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Automatically open modal when website loads
  useEffect(() => {
    setIsRendered(true);
    // Slight delay for smooth entrance transition on page load
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsRendered(false);
    }, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: false }));
    }
    if (formError) setFormError("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResumeError("");
    setFormError("");
    const file = e.target.files?.[0];

    if (!file) {
      setResumeFile(null);
      return;
    }

    // Maximum 1MB limit = 1024 * 1024 bytes
    const maxSizeBytes = 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setResumeError("File size exceeds 1 MB limit");
      setResumeFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setResumeFile(file);
    if (fieldErrors.resume) {
      setFieldErrors((prev) => ({ ...prev, resume: false }));
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const errors: Record<string, boolean> = {};
    if (!formData.firstName.trim()) errors.firstName = true;
    if (!formData.lastName.trim()) errors.lastName = true;
    if (!formData.email.trim() || !validateEmail(formData.email)) errors.email = true;
    if (!formData.country.trim()) errors.country = true;
    if (!formData.phone.trim()) errors.phone = true;
    if (!formData.address.trim()) errors.address = true;
    if (!resumeFile) errors.resume = true;

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0 || resumeError) {
      setFormError(
        "Please fill in all required fields, enter a valid email address and attach your resume (maximum 1 MB)."
      );
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 transition-all duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="query-modal-title"
    >
      {/* Dark backdrop overlay (outside clicks disabled) */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300" />

      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        className={`relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-[#070e20] border border-slate-700/80 rounded-2xl p-5 sm:p-7 sm:px-8 shadow-2xl shadow-black/90 transition-all duration-300 ease-out origin-center ${
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-3"
        }`}
      >
        {/* Close Button Top Right */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          /* Thank You Screen */
          <div className="py-10 sm:py-12 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-5 shadow-lg shadow-blue-500/10">
              <CheckCircle2 className="w-9 h-9 text-[#38bdf8]" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Thank you!
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-sm font-normal leading-relaxed">
              Your query has been received. We will contact you soon.
            </p>

            <button
              type="button"
              onClick={handleClose}
              className="mt-8 px-8 py-3 rounded-xl bg-[#1d68f2] hover:bg-[#1656cc] text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 cursor-pointer"
            >
              Continue to website
            </button>
          </div>
        ) : (
          /* Form Content */
          <div>
            {/* Header */}
            <div className="pr-8">
              <h2
                id="query-modal-title"
                className="text-xl sm:text-2xl font-bold text-white tracking-tight"
              >
                Send us your query
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Tell us about yourself and a Talent Bridge Hiring team member will get back to you. Fields marked{" "}
                <span className="text-blue-400 font-semibold">*</span> are required.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5 sm:space-y-4">
              {/* Row 1: First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    First Name <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    className={`w-full bg-[#040814] border ${
                      fieldErrors.firstName ? "border-rose-500/80 ring-1 ring-rose-500/30" : "border-slate-700/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    } rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    Last Name <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    className={`w-full bg-[#040814] border ${
                      fieldErrors.lastName ? "border-rose-500/80 ring-1 ring-rose-500/30" : "border-slate-700/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    } rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition`}
                  />
                </div>
              </div>

              {/* Row 2: Email Address & Country Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    Email Address <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className={`w-full bg-[#040814] border ${
                      fieldErrors.email ? "border-rose-500/80 ring-1 ring-rose-500/30" : "border-slate-700/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    } rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    Country Name <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Enter country"
                    className={`w-full bg-[#040814] border ${
                      fieldErrors.country ? "border-rose-500/80 ring-1 ring-rose-500/30" : "border-slate-700/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    } rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition`}
                  />
                </div>
              </div>

              {/* Row 3: Contact Number & Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    Contact Number <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter contact number"
                    className={`w-full bg-[#040814] border ${
                      fieldErrors.phone ? "border-rose-500/80 ring-1 ring-rose-500/30" : "border-slate-700/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    } rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    Address <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter address"
                    className={`w-full bg-[#040814] border ${
                      fieldErrors.address ? "border-rose-500/80 ring-1 ring-rose-500/30" : "border-slate-700/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    } rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition`}
                  />
                </div>
              </div>

              {/* Row 4: Resume */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  Resume <span className="text-blue-400">*</span>
                  <span className="text-[11px] font-normal text-slate-400 ml-1.5">
                    (attach file, maximum size 1 MB)
                  </span>
                </label>

                {/* Custom File Input Container */}
                <div
                  className={`w-full bg-[#040814] border ${
                    fieldErrors.resume || resumeError
                      ? "border-rose-500/80 ring-1 ring-rose-500/30"
                      : "border-slate-700/80 focus-within:border-blue-500"
                  } rounded-xl p-2.5 sm:p-3 flex items-center justify-between gap-3 transition`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <label
                      htmlFor="resume-upload"
                      className="shrink-0 px-3.5 py-1.5 rounded-lg bg-[#0d1830] hover:bg-[#132243] border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition cursor-pointer"
                    >
                      Choose File
                    </label>
                    <span className="text-xs text-slate-400 truncate">
                      {resumeFile ? resumeFile.name : "No file chosen"}
                    </span>
                  </div>

                  {resumeFile && (
                    <button
                      type="button"
                      onClick={() => {
                        setResumeFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      className="text-slate-400 hover:text-rose-400 p-1 rounded-md transition text-xs shrink-0"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}

                  <input
                    id="resume-upload"
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </div>

                {/* File Attachment & Error status */}
                <div className="flex flex-wrap items-center justify-between gap-2 mt-1.5 text-[11px] sm:text-xs">
                  <div className="text-[#38bdf8] flex items-center gap-1 truncate">
                    {resumeFile ? (
                      <>
                        <FileText className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">Attached: {resumeFile.name} ({(resumeFile.size / 1024).toFixed(0)} KB)</span>
                      </>
                    ) : (
                      <span className="text-slate-500">Attached: None</span>
                    )}
                  </div>

                  {resumeError && (
                    <div className="text-rose-400 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{resumeError}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Alert Message */}
              {formError && (
                <div className="pt-1 flex items-start gap-2 text-[11px] sm:text-xs text-[#fb923c] leading-relaxed">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#fb923c]" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Bottom Buttons */}
              <div className="pt-3 sm:pt-4 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#1d68f2] hover:bg-[#1656cc] disabled:opacity-70 text-white text-xs sm:text-sm font-semibold transition-all duration-200 shadow-md shadow-blue-600/20 cursor-pointer min-w-[130px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Query"
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#091124] border border-slate-700/90 hover:border-slate-500 text-slate-300 hover:text-white text-xs sm:text-sm font-medium transition cursor-pointer whitespace-nowrap"
                >
                  Skip for now
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
