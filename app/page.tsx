
import Sektion from "@/components/custom/sektion";
import React from "react";
import Hero from "@/components/custom/hero";
import Partner from "@/components/custom/partner";

import ScrollAnimation from "@/components/custom/scrollAnimation";





export default function Home() {
  const MetaData = {
    title: "Nordiskdev",
    description: "Vi är Nordiskdev, din techpartner i södra Sverige. Vi erbjuder skräddarsydda lösningar inom apputveckling, webbutveckling och konsulttjänster.",
    Apputveckling: "Mer information om apputveckling kommer snart.",
    Webbutveckling: "Mer information om webbutveckling kommer snart.",
    konsultering: "Mer information om konsulttjänster kommer snart.",
    backgroundImage: "/björkis.jpg",
  };

  

  return (
    <div className="" >
      <Hero />
      <Sektion data={MetaData} />
      <Partner />
      {/* <ResourceSektion /> */}
      <ScrollAnimation />

    </div>
  );
}



