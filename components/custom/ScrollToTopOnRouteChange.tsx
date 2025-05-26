"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollToTopOnRouteChange() {
  const pathname = usePathname();
  console.log("Current pathname:", pathname);
  useEffect(() => {
    console.log("Scroll to top on route change:", pathname);
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}