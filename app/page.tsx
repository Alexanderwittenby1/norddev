
import Sektion from "@/components/custom/sektion";
import React from "react";
import Hero from "@/components/custom/hero";
import { metadata } from "./layout";




export default function Home() {
  const MetaData = {
    title: "NordDev",
    description: "Vi på NordDev",
    Apputveckling: "Mer information om apputveckling kommer snart.",
    Webbutveckling: "Mer information om webbutveckling kommer snart.",
    konsultering: "Mer information om konsulttjänster kommer snart.",
    backgroundImage: "/björkis.jpg",
  };

  // const about = {
  //   title: "Om oss",
  //   description: "Vi är NordDev, din techpartner i södra Sverige. Vi erbjuder skräddarsydda lösningar inom apputveckling, webbutveckling och konsulttjänster. ",
  //   Apputveckling: "Vi skapar användarvänliga och funktionella appar som möter dina behov.",
  //   Webbutveckling: "Vi bygger moderna och responsiva webbplatser som hjälper dig att nå dina mål.",
  //   konsultering: "Våra erfarna konsulter erbjuder expertis inom olika teknikområden för att hjälpa dig att optimera din verksamhet.",
  // };
 

  return (
    <div className="" >
      <Hero title='ER VISION' span='VÅR UTMANING' subheading='Din Techpartner I Södra Sverige'/>
      <Sektion data={MetaData} />
      {/* <Sektion data={about} />   */}
    </div>
  );
}



