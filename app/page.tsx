
import Sektion from "@/components/custom/sektion";
import React from "react";
import Hero from "@/components/custom/hero";
import { metadata } from "./layout";
import { ParallaxProvider } from "react-scroll-parallax";



export default function Home() {

 

  return (
    <div >
      
      <Hero 
        title='ER VISION'
        span='VÅR UTMANING' />
      <Sektion /> 
      
      
    </div>
  );
}



