"use client";
import { useEffect } from "react";

export default function CustomScrollbar() {
  useEffect(() => {
    const updateScrollbar = () => {
      const scrollPercentage =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      document.body.style.setProperty(
        "--scroll-percentage",
        `${scrollPercentage}%`
      );
    };

    window.addEventListener("scroll", updateScrollbar);
    updateScrollbar();

    return () => window.removeEventListener("scroll", updateScrollbar);
  }, []);

  return null; // This component doesn't render anything
}
