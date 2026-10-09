"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface PostJobModalContextType {
  isOpen: boolean;
  openPostJobModal: () => void;
  closePostJobModal: () => void;
}

const PostJobModalContext = createContext<PostJobModalContextType | undefined>(undefined);

export function PostJobModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openPostJobModal = () => setIsOpen(true);
  const closePostJobModal = () => setIsOpen(false);

  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener("open-post-job-modal", handleOpenEvent);
    return () => window.removeEventListener("open-post-job-modal", handleOpenEvent);
  }, []);

  return (
    <PostJobModalContext.Provider value={{ isOpen, openPostJobModal, closePostJobModal }}>
      {children}
    </PostJobModalContext.Provider>
  );
}

export function usePostJobModal() {
  const context = useContext(PostJobModalContext);
  if (!context) {
    // Return fallback that triggers global event if used outside provider
    return {
      isOpen: false,
      openPostJobModal: () => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("open-post-job-modal"));
        }
      },
      closePostJobModal: () => {},
    };
  }
  return context;
}
