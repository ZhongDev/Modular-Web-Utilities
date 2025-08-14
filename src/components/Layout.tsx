import React, { Suspense, useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileNavbar from "./MobileNavbar";
import MobileBackdrop from "./MobileBackdrop";
import { Module } from "../types/module";

interface LayoutProps {
  modules: Module[];
}

const Layout: React.FC<LayoutProps> = ({ modules }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "offline" | "online";
  } | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimerRef = useRef<number | null>(null);
  const toastUnmountTimerRef = useRef<number | null>(null);

  // Mobile detection and initial state setup
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // On mobile, default to collapsed (hidden)
      if (mobile) {
        setIsCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Ephemeral offline/online toast notifications
  useEffect(() => {
    const showToast = (message: string, type: "offline" | "online") => {
      // Clear any existing timers
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
      if (toastUnmountTimerRef.current)
        window.clearTimeout(toastUnmountTimerRef.current);

      // Mount toast and animate in
      setToast({ message, type });
      // In next tick ensure transition applies
      requestAnimationFrame(() => setToastVisible(true));

      // After display duration, start animate out
      const DISPLAY_MS = 2500;
      const ANIM_MS = 300;
      toastTimerRef.current = window.setTimeout(() => {
        setToastVisible(false);
      }, DISPLAY_MS);

      // Unmount after exit animation completes
      toastUnmountTimerRef.current = window.setTimeout(() => {
        setToast(null);
      }, DISPLAY_MS + ANIM_MS);
    };

    // Show an offline message if the app loads while offline
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      showToast(
        "You are offline. Some features may be unavailable.",
        "offline"
      );
    }

    const handleOnline = () => showToast("Back online.", "online");
    const handleOffline = () =>
      showToast(
        "You are offline. Some features may be unavailable.",
        "offline"
      );

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
      if (toastUnmountTimerRef.current)
        window.clearTimeout(toastUnmountTimerRef.current);
    };
  }, []);

  return (
    <div className="h-screen bg-gray-100">
      {/* Mobile Navbar - only visible on mobile */}
      <MobileNavbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Mobile Backdrop - only visible on mobile when sidebar is open */}
      <MobileBackdrop
        isVisible={isMobile && !isCollapsed}
        onClose={() => setIsCollapsed(true)}
      />

      <div
        className={`flex ${isMobile ? "h-full pt-16" : "h-full md:h-screen"}`}
      >
        <Sidebar
          modules={modules}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-auto p-6">
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </main>
        </div>
      </div>

      {/* Ephemeral network status toast (only shows offline or when coming back online) */}
      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <div
            role="status"
            aria-live="polite"
            className={`px-4 py-2 rounded-md shadow-lg ring-1 ring-white/10 text-white transition-all duration-300 ease-out transform ${
              toast.type === "offline" ? "bg-red-600" : "bg-emerald-600"
            } ${
              toastVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
