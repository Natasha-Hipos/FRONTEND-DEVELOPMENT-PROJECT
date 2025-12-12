import React, { useState, ReactNode, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface DropdownProps {
  buttonContent: ReactNode;
  children: ReactNode;
  className?: string; // allows custom positioning (top-12, etc.)
  id?: string;
  align?: "left" | "right";
}

const Dropdown: React.FC<DropdownProps> = ({ buttonContent, children, className = "", id, align = "right" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const idRef = useRef<string>(id ?? `dropdown-${Math.random().toString(36).slice(2, 9)}`);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedOutsideDropdown = dropdownRef.current && !dropdownRef.current.contains(target);
      const clickedOutsideWrapper = wrapperRef.current && !wrapperRef.current.contains(target);
      if (isOpen && clickedOutsideDropdown && clickedOutsideWrapper) setIsOpen(false);
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    const handleOtherDropdownOpen = (ev: Event) => {
      const ce = ev as CustomEvent<string>;
      const otherId = ce?.detail;
      if (otherId && otherId !== idRef.current) setIsOpen(false);
    };

    const onResize = () => setIsMobile(window.innerWidth <= 640);
    onResize();

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("dropdown-open", handleOtherDropdownOpen as EventListener);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("dropdown-open", handleOtherDropdownOpen as EventListener);
      window.removeEventListener("resize", onResize);
    };
  }, [isOpen]);

  // announce when this dropdown opens so others can close
  useEffect(() => {
    if (isOpen) {
      window.dispatchEvent(new CustomEvent("dropdown-open", { detail: idRef.current }));
    }
  }, [isOpen]);

  const dropdownClassesBase = `
    z-[9999]
    bg-white dark:bg-gray-800
    rounded-lg shadow-md
    border border-gray-200 dark:border-gray-700
    text-gray-900 dark:text-gray-100
    w-max max-w-[90vw]
    ${className}
  `;

  const mobileClasses = `
  fixed top-16 ${align === "left" ? "left-4" : "right-4"} z-[9999]
  max-h-[calc(100vh-6rem)] overflow-auto
  bg-white dark:bg-gray-800
  rounded-md
  text-gray-900 dark:text-gray-100
  border border-gray-200 dark:border-gray-700
  w-40
`;

  const dropdownElement = (
    <div
      ref={dropdownRef}
      className={
        isMobile
          ? mobileClasses
          : `absolute top-full right-0 mt-2 ${dropdownClassesBase}`
      }
      role="menu"
    >
      {children}
    </div>
  );

  return (
    <div className="relative overflow-visible" ref={wrapperRef}>
      <button onClick={() => setIsOpen((s) => !s)} className="focus:outline-none">
        {buttonContent}
      </button>

      {isOpen && (isMobile ? createPortal(dropdownElement, document.body) : dropdownElement)}
    </div>
  );
};

export default Dropdown;
