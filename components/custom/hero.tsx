"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

interface HeroProps {
  title: string;
  span: string;
}

export default function Hero({ title, span }: HeroProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  
  return (
    <div
      ref={ref}
      
      className="relative w-full h-dvh overflow-hidden ">
      
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
      
      <h1
        
        className="absolute inset-0 z-10 flex items-center justify-center">
        <h1 className="font-bold text-white text-4xl md:text-6xl text-center select-none drop-shadow-lg">
          {title} <span className="text-[#b697ec]">{span}</span>
        </h1>
      </h1>
    </div>
  );
}

