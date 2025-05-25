import Sektion from "@/components/custom/sektion";
import React from "react";
import Hero from "@/components/custom/hero";



export default function Home() {

  const MetaData = {
    title: "NordDev",
    description: "Vi på NordDev",
    Apputveckling: "Mer information om apputveckling kommer snart.",
    Webbutveckling: "Mer information om webbutveckling kommer snart.",
    konsultering: "Mer information om konsulttjänster kommer snart.",
  };

  return (
    <div >
      
      <Hero /> 
      <Sektion />
      
      
    </div>
  );
}
