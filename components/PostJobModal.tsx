"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  CheckCircle2,
  Building2,
  Briefcase,
  UserCheck,
  DollarSign,
  FileText,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { usePostJobModal } from "@/context/PostJobModalContext";
import CustomDatePicker from "@/components/CustomDatePicker";

export default function PostJobModal() {
  const { isOpen, closePostJobModal } = usePostJobModal();

  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const modalBodyRef = useRef<HTMLDivElement>(null);

  // Form State covering all 8 sections from the client document
  const [formData, setFormData] = useState({
    // 1. Company Information
    companyName: "",
    businessIndustry: "",
    companyAddress: "",
    website: "",
    companyRegNumber: "",
    contactPersonName: "",
    designation: "",
    mobileWhatsapp: "",
    email: "",

    // 2. Hiring Requirement
    jobTitle: "",
    vacancies: "1",
    department: "",
    positionType: "New Position", // New Position / Replacement
    jobLocation: "",
    employmentType: "Full-time", // Full-time / Part-time / Contract
    joiningDate: "",
    workingDays: "Monday - Friday (5 Days)",
    workingHours: "9:00 AM - 6:00 PM",
    shiftDetails: "Day Shift",

    // 3. Candidate Requirements
    minEducation: "",
    requiredDegree: "",
    requiredExperience: "",
    fresherAccepted: "No", // Yes / No
    ageRequirement: "",
    genderRequirement: "No preference / As per legal guidelines",
    requiredSkills: "",
    technicalSkills: "",
    softwareSkills: "",
    languageRequirements: "English",
    industryExperience: "",
    mandatoryLicenses: "",

    // 4. Salary & Benefits
    salaryRange: "",
    commissionBonuses: "",
    overtimePolicy: "",
    medicalBenefits: "Provided",
    providentFund: "",
    paidLeave: "As per labor law",
    transport: "Not Provided",
    accommodation: "Not Provided",
    otherBenefits: "",

    // 5. Job Description
    mainResponsibilities: "",
    dailyDuties: "",
    reportingManager: "",
    teamSize: "",
    careerGrowth: "",

    // 6. Recruitment Process
    interviewRounds: "2",
    hiringDecisionTime: "1-2 Weeks",
    backgroundVerification: "Required",
    documentsRequired: "Updated CV, Educational Degrees, ID Proof",

    // 7. Recruitment Agency Agreement
    paymentTerms: "30 days net upon joining",
    invoiceRequirements: "Standard Company Invoice",
    advertisingCost: "Agency Responsible",
    confidentiality: "Strict Non-Disclosure required",

    // 8. Final Approval
    authorizedPerson: "",
    approvalDate: "",
    termsAccepted: false,
  });

  // Set default client-side approval date safely inside useEffect
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      approvalDate: prev.approvalDate || new Date().toISOString().split("T")[0],
    }));
  }, []);

  // Prevent background scrolling when open
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

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleModalClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Scroll to top of modal on step change
  useEffect(() => {
    if (modalBodyRef.current) {
      modalBodyRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeStep]);

  const handleModalClose = () => {
    closePostJobModal();
    // Reset state after animation
    setTimeout(() => {
      setActiveStep(1);
      setIsSubmitted(false);
      setErrorMessage("");
    }, 350);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errorMessage) setErrorMessage("");
  };

  const validateCurrentStep = (step: number): boolean => {
    setErrorMessage("");
    if (step === 1) {
      if (!formData.companyName.trim()) {
        setErrorMessage("Please enter Company Name.");
        return false;
      }
      if (!formData.contactPersonName.trim()) {
        setErrorMessage("Please enter Contact Person Name.");
        return false;
      }
      if (!formData.email.trim() || !formData.email.includes("@")) {
        setErrorMessage("Please enter a valid Company Email Address.");
        return false;
      }
      if (!formData.mobileWhatsapp.trim()) {
        setErrorMessage("Please enter Mobile / WhatsApp number.");
        return false;
      }
    } else if (step === 2) {
      if (!formData.jobTitle.trim()) {
        setErrorMessage("Please enter Position / Job Title.");
        return false;
      }
      if (!formData.jobLocation.trim()) {
        setErrorMessage("Please specify Job Location.");
        return false;
      }
    } else if (step === 6) {
      if (!formData.authorizedPerson.trim()) {
        setErrorMessage("Please provide Authorized Contact Person Name & Designation.");
        return false;
      }
      if (!formData.termsAccepted) {
        setErrorMessage("Please confirm and accept the authorization terms.");
        return false;
      }
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateCurrentStep(activeStep)) {
      if (activeStep < 6) {
        setActiveStep((prev) => prev + 1);
      }
    }
  };

  const handlePrevStep = () => {
    setErrorMessage("");
    if (activeStep > 1) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCurrentStep(6)) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const steps = [
    { id: 1, title: "Company", icon: Building2, desc: "Company Details" },
    { id: 2, title: "Hiring", icon: Briefcase, desc: "Role & Position" },
    { id: 3, title: "Candidate", icon: UserCheck, desc: "Requirements & Skills" },
    { id: 4, title: "Compensation", icon: DollarSign, desc: "Salary & Benefits" },
    { id: 5, title: "Description", icon: FileText, desc: "Duties & Process" },
    { id: 6, title: "Approval", icon: ShieldCheck, desc: "Terms & Signature" },
  ];

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 transition-all duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="post-job-modal-title"
    >
      {/* Dark backdrop overlay (outside clicks disabled as requested) */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300" />

      {/* Modal Dialog Card */}
      <div
        className={`relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#070e20] border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/90 transition-all duration-300 ease-out origin-center overflow-hidden ${
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-3"
        }`}
      >
        {/* Modal Header */}
        <div className="px-5 sm:px-8 pt-5 pb-4 border-b border-slate-800/90 flex items-start justify-between bg-[#050b18]/70 backdrop-blur-md shrink-0">
          <div>
            <h2
              id="post-job-modal-title"
              className="text-xl sm:text-2xl font-bold text-white tracking-tight"
            >
              Post a Job Opening
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-xl">
              Provide your hiring details below. Our Talent Bridge team will verify the listing and connect you with qualified talent.
            </p>
          </div>

          {/* Close X Button */}
          <button
            type="button"
            onClick={handleModalClose}
            aria-label="Close modal"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition cursor-pointer shrink-0 ml-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Step Navigation Bar */}
        {!isSubmitted && (
          <div className="px-5 sm:px-8 py-3 bg-[#0a142c]/50 border-b border-slate-800/80 shrink-0">
            <div className="flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto scrollbar-none pb-1">
              {steps.map((step) => {
                const Icon = step.icon;
                const isCurrent = activeStep === step.id;
                const isPassed = activeStep > step.id;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => {
                      // Allow clicking previous steps or validated transitions
                      if (step.id < activeStep || validateCurrentStep(activeStep)) {
                        setActiveStep(step.id);
                      }
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                      isCurrent
                        ? "bg-[#1d68f2] text-white shadow-md shadow-blue-600/30 font-semibold"
                        : isPassed
                        ? "bg-slate-800/70 text-slate-200 hover:bg-slate-700/60"
                        : "bg-slate-900/60 text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                        isCurrent
                          ? "bg-white text-blue-700"
                          : isPassed
                          ? "bg-blue-500/20 text-[#38bdf8]"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {isPassed ? "✓" : step.id}
                    </div>
                    <span>{step.title}</span>
                  </button>
                );
              })}
            </div>
            {/* Progress line */}
            <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-[#38bdf8] h-full transition-all duration-300 ease-out"
                style={{ width: `${(activeStep / 6) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div ref={modalBodyRef} className="flex-1 overflow-y-auto p-5 sm:p-8">
          {isSubmitted ? (
            /* Thank You Screen */
            <div className="py-12 sm:py-16 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-5 shadow-lg shadow-blue-500/10">
                <CheckCircle2 className="w-9 h-9 text-[#38bdf8]" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Job Post Submitted Successfully!
              </h3>

              <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-lg font-normal leading-relaxed">
                Thank you for providing the company and hiring details for{" "}
                <span className="text-[#38bdf8] font-semibold">{formData.jobTitle || "your position"}</span>. Our Talent Bridge Hiring team is reviewing your requirements and will contact you shortly.
              </p>

              <button
                type="button"
                onClick={handleModalClose}
                className="mt-8 px-8 py-3 rounded-xl bg-[#1d68f2] hover:bg-[#1656cc] text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 cursor-pointer"
              >
                Continue to website
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error banner */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2.5 text-xs sm:text-sm text-[#fb923c] animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#fb923c]" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* STEP 1: 1. COMPANY INFORMATION */}
              {activeStep === 1 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="border-b border-slate-800 pb-2">
                    <h3 className="text-base sm:text-lg font-semibold text-white">
                      1. Company Information
                    </h3>
                    <p className="text-xs text-slate-400">
                      Provide official organization background and point of contact.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Company Name <span className="text-blue-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="e.g. Acme Global Technologies"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Business / Industry <span className="text-blue-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="businessIndustry"
                        value={formData.businessIndustry}
                        onChange={handleInputChange}
                        placeholder="e.g. Information Technology / Healthcare"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Company Address <span className="text-blue-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="companyAddress"
                        value={formData.companyAddress}
                        onChange={handleInputChange}
                        placeholder="Complete Head Office or Branch Address"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Website
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="https://www.example.com"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Company Registration Number{" "}
                        <span className="text-slate-500 font-normal">(if applicable)</span>
                      </label>
                      <input
                        type="text"
                        name="companyRegNumber"
                        value={formData.companyRegNumber}
                        onChange={handleInputChange}
                        placeholder="CR / Registration / NTN #"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Contact Person Name <span className="text-blue-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="contactPersonName"
                        value={formData.contactPersonName}
                        onChange={handleInputChange}
                        placeholder="HR Manager / Hiring Lead"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Designation <span className="text-blue-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                        placeholder="e.g. HR Director / Talent Acquisition Lead"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Mobile / WhatsApp <span className="text-blue-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="mobileWhatsapp"
                        value={formData.mobileWhatsapp}
                        onChange={handleInputChange}
                        placeholder="+1 234 567 8900"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Official Email <span className="text-blue-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="hr@company.com"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: 2. HIRING REQUIREMENT */}
              {activeStep === 2 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="border-b border-slate-800 pb-2">
                    <h3 className="text-base sm:text-lg font-semibold text-white">
                      2. Hiring Requirement
                    </h3>
                    <p className="text-xs text-slate-400">
                      Specify position particulars, location, and working hours schedule.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Position / Job Title <span className="text-blue-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        placeholder="e.g. Senior Software Engineer / Registered Nurse"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Number of Vacancies
                      </label>
                      <input
                        type="number"
                        name="vacancies"
                        min="1"
                        value={formData.vacancies}
                        onChange={handleInputChange}
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Department
                      </label>
                      <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        placeholder="e.g. Engineering / Operations"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div className="min-w-0">
                      <label className="block text-xs font-semibold text-slate-200 mb-1 truncate sm:whitespace-normal">
                        New Position / Replacement
                      </label>
                      <div className="relative w-full min-w-0">
                        <select
                          name="positionType"
                          value={formData.positionType}
                          onChange={handleInputChange}
                          className="w-full min-w-0 appearance-none bg-[#040814] border border-slate-700/80 rounded-xl pl-3.5 pr-10 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition cursor-pointer"
                        >
                          <option className="bg-[#070e20] text-white py-2" value="New Position">New Position</option>
                          <option className="bg-[#070e20] text-white py-2" value="Replacement">Replacement</option>
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div className="min-w-0">
                      <label className="block text-xs font-semibold text-slate-200 mb-1 truncate sm:whitespace-normal">
                        Employment Type
                      </label>
                      <div className="relative w-full min-w-0">
                        <select
                          name="employmentType"
                          value={formData.employmentType}
                          onChange={handleInputChange}
                          className="w-full min-w-0 appearance-none bg-[#040814] border border-slate-700/80 rounded-xl pl-3.5 pr-10 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition cursor-pointer"
                        >
                          <option className="bg-[#070e20] text-white py-2" value="Full-time">Full-time</option>
                          <option className="bg-[#070e20] text-white py-2" value="Part-time">Part-time</option>
                          <option className="bg-[#070e20] text-white py-2" value="Contract">Contract</option>
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div className="min-w-0">
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Job Location <span className="text-blue-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="jobLocation"
                        value={formData.jobLocation}
                        onChange={handleInputChange}
                        placeholder="City, Country (or Remote / On-site)"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div className="min-w-0">
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Required Joining Date
                      </label>
                      <CustomDatePicker
                        value={formData.joiningDate}
                        onChange={(dateStr) =>
                          setFormData((prev) => ({ ...prev, joiningDate: dateStr }))
                        }
                        placeholder="Select joining date"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Working Days
                      </label>
                      <input
                        type="text"
                        name="workingDays"
                        value={formData.workingDays}
                        onChange={handleInputChange}
                        placeholder="e.g. Mon - Fri (5 days)"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Working Hours
                      </label>
                      <input
                        type="text"
                        name="workingHours"
                        value={formData.workingHours}
                        onChange={handleInputChange}
                        placeholder="e.g. 9:00 AM - 6:00 PM"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div className="sm:col-span-2 md:col-span-2">
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Shift Details
                      </label>
                      <input
                        type="text"
                        name="shiftDetails"
                        value={formData.shiftDetails}
                        onChange={handleInputChange}
                        placeholder="e.g. Morning / Night / Rotational Shift"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: 3. CANDIDATE REQUIREMENTS */}
              {activeStep === 3 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="border-b border-slate-800 pb-2">
                    <h3 className="text-base sm:text-lg font-semibold text-white">
                      3. Candidate Requirements
                    </h3>
                    <p className="text-xs text-slate-400">
                      Specify qualifications, experience levels, and required competencies.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Minimum Education
                      </label>
                      <input
                        type="text"
                        name="minEducation"
                        value={formData.minEducation}
                        onChange={handleInputChange}
                        placeholder="e.g. Bachelor's Degree / Diploma"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Required Degree / Certification
                      </label>
                      <input
                        type="text"
                        name="requiredDegree"
                        value={formData.requiredDegree}
                        onChange={handleInputChange}
                        placeholder="e.g. BS in Computer Science, CPA, RN"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Required Experience
                      </label>
                      <input
                        type="text"
                        name="requiredExperience"
                        value={formData.requiredExperience}
                        onChange={handleInputChange}
                        placeholder="e.g. 2 - 4 Years in similar role"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div className="min-w-0">
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Fresher Accepted?
                      </label>
                      <div className="relative w-full min-w-0">
                        <select
                          name="fresherAccepted"
                          value={formData.fresherAccepted}
                          onChange={handleInputChange}
                          className="w-full min-w-0 appearance-none bg-[#040814] border border-slate-700/80 rounded-xl pl-3.5 pr-10 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition cursor-pointer"
                        >
                          <option className="bg-[#070e20] text-white py-2" value="Yes">Yes</option>
                          <option className="bg-[#070e20] text-white py-2" value="No">No</option>
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Age Requirement{" "}
                        <span className="text-slate-500 font-normal">(if legally appropriate)</span>
                      </label>
                      <input
                        type="text"
                        name="ageRequirement"
                        value={formData.ageRequirement}
                        onChange={handleInputChange}
                        placeholder="e.g. 21 - 45 Years"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Gender Requirement{" "}
                        <span className="text-slate-500 font-normal">(if legally appropriate)</span>
                      </label>
                      <input
                        type="text"
                        name="genderRequirement"
                        value={formData.genderRequirement}
                        onChange={handleInputChange}
                        placeholder="e.g. Any / Male / Female"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Required Core Skills
                      </label>
                      <input
                        type="text"
                        name="requiredSkills"
                        value={formData.requiredSkills}
                        onChange={handleInputChange}
                        placeholder="e.g. Problem Solving, Project Management, Client Handling"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Technical Skills
                      </label>
                      <input
                        type="text"
                        name="technicalSkills"
                        value={formData.technicalSkills}
                        onChange={handleInputChange}
                        placeholder="e.g. React, Node.js, SQL, Machine Learning"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Software / Computer Skills
                      </label>
                      <input
                        type="text"
                        name="softwareSkills"
                        value={formData.softwareSkills}
                        onChange={handleInputChange}
                        placeholder="e.g. Microsoft Excel, Jira, Figma, Salesforce"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Language Requirements
                      </label>
                      <input
                        type="text"
                        name="languageRequirements"
                        value={formData.languageRequirements}
                        onChange={handleInputChange}
                        placeholder="e.g. Fluent English, Arabic, German"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Industry Experience
                      </label>
                      <input
                        type="text"
                        name="industryExperience"
                        value={formData.industryExperience}
                        onChange={handleInputChange}
                        placeholder="e.g. Prior Fintech or Hospital experience"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Any Mandatory Licenses / Certifications
                      </label>
                      <input
                        type="text"
                        name="mandatoryLicenses"
                        value={formData.mandatoryLicenses}
                        onChange={handleInputChange}
                        placeholder="e.g. Valid Driver's License, PMP, AWS Certified Solutions Architect"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: 4. SALARY & BENEFITS */}
              {activeStep === 4 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="border-b border-slate-800 pb-2">
                    <h3 className="text-base sm:text-lg font-semibold text-white">
                      4. Salary & Benefits
                    </h3>
                    <p className="text-xs text-slate-400">
                      Detail package brackets, bonuses, medical coverage, and allowances.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="sm:col-span-2 md:col-span-2">
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Salary Range <span className="text-blue-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="salaryRange"
                        value={formData.salaryRange}
                        onChange={handleInputChange}
                        placeholder="e.g. $4,000 - $6,000 / Month (or Local Currency)"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Commission / Bonuses
                      </label>
                      <input
                        type="text"
                        name="commissionBonuses"
                        value={formData.commissionBonuses}
                        onChange={handleInputChange}
                        placeholder="e.g. Performance Bonus / Annual"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Overtime Policy
                      </label>
                      <input
                        type="text"
                        name="overtimePolicy"
                        value={formData.overtimePolicy}
                        onChange={handleInputChange}
                        placeholder="e.g. Paid as per law / Not Applicable"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Medical / Health Benefits
                      </label>
                      <input
                        type="text"
                        name="medicalBenefits"
                        value={formData.medicalBenefits}
                        onChange={handleInputChange}
                        placeholder="e.g. Complete Health Insurance"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Provident Fund / Other Benefits
                      </label>
                      <input
                        type="text"
                        name="providentFund"
                        value={formData.providentFund}
                        onChange={handleInputChange}
                        placeholder="e.g. Gratuity / Pension / PF"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Paid Leave
                      </label>
                      <input
                        type="text"
                        name="paidLeave"
                        value={formData.paidLeave}
                        onChange={handleInputChange}
                        placeholder="e.g. 24 Days / Year + Public Holidays"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div className="min-w-0">
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Transport
                      </label>
                      <div className="relative w-full min-w-0">
                        <select
                          name="transport"
                          value={formData.transport}
                          onChange={handleInputChange}
                          className="w-full min-w-0 appearance-none bg-[#040814] border border-slate-700/80 rounded-xl pl-3.5 pr-10 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition cursor-pointer"
                        >
                          <option className="bg-[#070e20] text-white py-2" value="Provided">Provided</option>
                          <option className="bg-[#070e20] text-white py-2" value="Allowance Provided">Allowance Provided</option>
                          <option className="bg-[#070e20] text-white py-2" value="Not Provided">Not Provided</option>
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div className="min-w-0">
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Accommodation
                      </label>
                      <div className="relative w-full min-w-0">
                        <select
                          name="accommodation"
                          value={formData.accommodation}
                          onChange={handleInputChange}
                          className="w-full min-w-0 appearance-none bg-[#040814] border border-slate-700/80 rounded-xl pl-3.5 pr-10 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition cursor-pointer"
                        >
                          <option className="bg-[#070e20] text-white py-2" value="Provided">Provided</option>
                          <option className="bg-[#070e20] text-white py-2" value="Allowance Provided">Allowance Provided</option>
                          <option className="bg-[#070e20] text-white py-2" value="Not Provided">Not Provided</option>
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-2 md:col-span-3">
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Other Benefits
                      </label>
                      <input
                        type="text"
                        name="otherBenefits"
                        value={formData.otherBenefits}
                        onChange={handleInputChange}
                        placeholder="e.g. Visa sponsorship, Relocation allowance, Remote equipment allowance"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: 5. JOB DESCRIPTION & 6. RECRUITMENT PROCESS */}
              {activeStep === 5 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="border-b border-slate-800 pb-2">
                    <h3 className="text-base sm:text-lg font-semibold text-white">
                      5. Job Description & Recruitment Process
                    </h3>
                    <p className="text-xs text-slate-400">
                      Outline key responsibilities, managerial hierarchy, and interview stages.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Main Responsibilities
                      </label>
                      <textarea
                        rows={3}
                        name="mainResponsibilities"
                        value={formData.mainResponsibilities}
                        onChange={handleInputChange}
                        placeholder="Key responsibilities and goals expected from the candidate..."
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Daily Duties
                      </label>
                      <textarea
                        rows={2}
                        name="dailyDuties"
                        value={formData.dailyDuties}
                        onChange={handleInputChange}
                        placeholder="Specific recurring tasks or workflows..."
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-200 mb-1">
                          Reporting Manager
                        </label>
                        <input
                          type="text"
                          name="reportingManager"
                          value={formData.reportingManager}
                          onChange={handleInputChange}
                          placeholder="e.g. VP of Engineering"
                          className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-200 mb-1">
                          Team Size
                        </label>
                        <input
                          type="text"
                          name="teamSize"
                          value={formData.teamSize}
                          onChange={handleInputChange}
                          placeholder="e.g. 8-12 Team Members"
                          className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-200 mb-1">
                          Career Growth Opportunities
                        </label>
                        <input
                          type="text"
                          name="careerGrowth"
                          value={formData.careerGrowth}
                          onChange={handleInputChange}
                          placeholder="e.g. Lead / Managerial promotion track"
                          className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                        />
                      </div>
                    </div>

                    <div className="border-t border-slate-800 pt-3">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                        Recruitment Process Settings
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-200 mb-1">
                            Interview Rounds
                          </label>
                          <input
                            type="text"
                            name="interviewRounds"
                            value={formData.interviewRounds}
                            onChange={handleInputChange}
                            placeholder="e.g. 2 Rounds (Technical + HR)"
                            className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-200 mb-1">
                            Expected Decision Time
                          </label>
                          <input
                            type="text"
                            name="hiringDecisionTime"
                            value={formData.hiringDecisionTime}
                            onChange={handleInputChange}
                            placeholder="e.g. 7-10 Business Days"
                            className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                          />
                        </div>

                        <div className="min-w-0">
                          <label className="block text-xs font-semibold text-slate-200 mb-1">
                            Background Verification
                          </label>
                          <div className="relative w-full min-w-0">
                            <select
                              name="backgroundVerification"
                              value={formData.backgroundVerification}
                              onChange={handleInputChange}
                              className="w-full min-w-0 appearance-none bg-[#040814] border border-slate-700/80 rounded-xl pl-3.5 pr-10 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition cursor-pointer"
                            >
                              <option className="bg-[#070e20] text-white py-2" value="Required">Required</option>
                              <option className="bg-[#070e20] text-white py-2" value="Not Required">Not Required</option>
                              <option className="bg-[#070e20] text-white py-2" value="Standard Reference Check">Standard Reference Check</option>
                            </select>
                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                              <ChevronDown className="w-4 h-4" />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-200 mb-1">
                            Documents Required
                          </label>
                          <input
                            type="text"
                            name="documentsRequired"
                            value={formData.documentsRequired}
                            onChange={handleInputChange}
                            placeholder="e.g. CV, Degree, Passport"
                            className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: 7. AGENCY AGREEMENT & 8. FINAL APPROVAL */}
              {activeStep === 6 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="border-b border-slate-800 pb-2">
                    <h3 className="text-base sm:text-lg font-semibold text-white">
                      7. Agency Agreement & 8. Final Approval
                    </h3>
                    <p className="text-xs text-slate-400">
                      Review commercial conditions and sign off on hiring mandate.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Payment Terms
                      </label>
                      <input
                        type="text"
                        name="paymentTerms"
                        value={formData.paymentTerms}
                        onChange={handleInputChange}
                        placeholder="e.g. 30 Days upon successful placement"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Invoice Requirements
                      </label>
                      <input
                        type="text"
                        name="invoiceRequirements"
                        value={formData.invoiceRequirements}
                        onChange={handleInputChange}
                        placeholder="e.g. Tax Invoice with PO #"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div className="min-w-0">
                      <label className="block text-xs font-semibold text-slate-200 mb-1 truncate sm:whitespace-normal">
                        Who is responsible for advertising costs
                      </label>
                      <div className="relative w-full min-w-0">
                        <select
                          name="advertisingCost"
                          value={formData.advertisingCost}
                          onChange={handleInputChange}
                          className="w-full min-w-0 appearance-none bg-[#040814] border border-slate-700/80 rounded-xl pl-3.5 pr-10 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition cursor-pointer"
                        >
                          <option className="bg-[#070e20] text-white py-2" value="Agency Responsible">Talent Bridge Agency (Standard)</option>
                          <option className="bg-[#070e20] text-white py-2" value="Company Responsible">Client Company</option>
                          <option className="bg-[#070e20] text-white py-2" value="Shared / Mutually Agreed">Shared / Mutually Agreed</option>
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Confidentiality Requirements
                      </label>
                      <input
                        type="text"
                        name="confidentiality"
                        value={formData.confidentiality}
                        onChange={handleInputChange}
                        placeholder="e.g. Strict Non-Disclosure Agreement (NDA)"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div className="sm:col-span-2 border-t border-slate-800 pt-3">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                        8. Final Approval & Authorization
                      </h4>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Authorized Contact Person Name & Designation <span className="text-blue-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="authorizedPerson"
                        value={formData.authorizedPerson}
                        onChange={handleInputChange}
                        placeholder="e.g. Alex Morgan - Managing Director"
                        className="w-full bg-[#040814] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div className="min-w-0">
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Date of Submission
                      </label>
                      <CustomDatePicker
                        value={formData.approvalDate}
                        onChange={(dateStr) =>
                          setFormData((prev) => ({ ...prev, approvalDate: dateStr }))
                        }
                        placeholder="Select submission date"
                      />
                    </div>

                    <div className="sm:col-span-2 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="termsAccepted"
                          checked={formData.termsAccepted}
                          onChange={handleInputChange}
                          className="mt-1 w-4 h-4 rounded border-slate-700 text-blue-600 focus:ring-blue-500 bg-[#040814]"
                        />
                        <span className="text-xs text-slate-300 leading-relaxed">
                          I declare that the information provided in this recruitment form is accurate, and I am authorized by my company to engage Talent Bridge Hiring for this recruitment mandate. (Digital Signature & Company Stamp Authorization).
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Actions Navigation */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {activeStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#091124] border border-slate-700/90 hover:border-slate-500 text-slate-300 hover:text-white text-xs sm:text-sm font-medium transition cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleModalClose}
                      className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#091124] border border-slate-700/90 hover:border-slate-500 text-slate-400 hover:text-white text-xs sm:text-sm font-medium transition cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 hidden sm:inline">
                    Step {activeStep} of 6
                  </span>

                  {activeStep < 6 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#1d68f2] hover:bg-[#1656cc] text-white text-xs sm:text-sm font-semibold transition-all duration-200 shadow-md shadow-blue-600/20 cursor-pointer"
                    >
                      Next Step
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center px-7 py-2.5 rounded-xl bg-[#1d68f2] hover:bg-[#1656cc] disabled:opacity-70 text-white text-xs sm:text-sm font-semibold transition-all duration-200 shadow-md shadow-blue-600/30 cursor-pointer min-w-[140px]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Job Post"
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
