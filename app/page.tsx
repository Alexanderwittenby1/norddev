
import Sektion from "@/components/custom/sektion";
import React from "react";
import Hero from "@/components/custom/hero";
import Partner from "@/components/custom/partner";

import ScrollAnimation from "@/components/custom/scrollAnimation";


export const metadata = {
  title: "Hem - NordiskDev",
  description: "Välkommen till NordiskDev - din techpartner i södra Sverige. Vi erbjuder skräddarsydda digitala lösningar.",
};


export default function Home() {

  return (
    <div className="" >
      <Hero />
      <Partner />
      <ScrollAnimation />

    </div>
  );
}



