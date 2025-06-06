"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

interface HeroProps {
  title: string;
  span: string;
  subheading?: string;
}

export default function Hero({ title, span,subheading }: HeroProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  
  
  return (
    <div
      ref={ref}
      
      className="relative w-full h-screen overflow-hidden  ">
      
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/full-image.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
          y: backgroundY,
        }}
      />
      
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: 'url(/Subtract.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
        }}
      />
      
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
        <h1 className="font-bold text-white text-4xl md:text-6xl text-center select-none drop-shadow-lg">
          {title} <span className="text-[#b697ec]">{span}</span>
        </h1>
        <p className="text-white mt-4 text-lg font-bold">{subheading}</p>
      </div>
    </div>
  );
}

