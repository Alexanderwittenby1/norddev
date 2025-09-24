
import Sektion from "@/components/custom/sektion";
import React from "react";
import Hero from "@/components/custom/hero";
import Partner from "@/components/custom/partner";
import ResourceSektion from "@/components/custom/resourceSektion";
import ScrollAnimation from "@/components/custom/scrollAnimation";





export default function Home() {
  const MetaData = {
    title: "Nordiskdev",
    description: "Vi är Nordiskdev, din techpartner i södra Sverige. Vi erbjuder skräddarsydda lösningar inom apputveckling, webbutveckling och konsulttjänster.",
    Apputveckling: "Om du någonsin tänkt att detta skulle man haft en app till så kan göra tanken till verklighet. Vi erbjuder apputveckling för både Android och Iphone.",
    Webbutveckling: "Är ni ett nystartat bolag som behöver ny hemsida? Kanske är er gamla sida grå och trist? Vi hjälper er skapa en ny, fräsch sida!",
    konsultering: "Vilken programvara är bäst för att lösa just era problem? Genom vår konsultering hittar vi en lösning i er prisklass",
    backgroundImage: "/björkis.jpg",
  };

  

  return (
    <div className="" >
      <Hero title='ER VISION' span='VÅR UTMANING' subheading='Vi finns med dig, från problem till lösning'/>
      <Sektion data={MetaData} />
      <Partner />
      {/* <ResourceSektion /> */}
      <ScrollAnimation />

    </div>
  );
}



