"use client"
import React from 'react'
import Hero from '@/components/custom/hero'
import ProfileCard from '@/components/custom/profileCard'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { delay } from 'framer-motion'

export default function Page() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  
  return (
    <div className="relative">
      <Hero 
      image='/milad.jpg'
      title='VÅRA' 
      span='UTVECKLARE'/>
      <Carousel
        plugins={[plugin.current]}
        opts={{ align: "start", loop: true}}
        className="w-full h-96">
        <CarouselContent className="flex ">
          <CarouselItem className="lg:basis-1/3 md:basis-1/2 basis-full">
          <ProfileCard 
          name='Erik Leopold Jacobsen'
          image='/milad.jpg'
          description='Erik ' /></CarouselItem>
          <CarouselItem className="lg:basis-1/3 md:basis-1/2 basis-full">
            <ProfileCard 
            name='Isak Klaesson'
            image='/milad.jpg'
            description='Isak ' />
          </CarouselItem>
          <CarouselItem className="lg:basis-1/3 md:basis-1/2 basis-full">
            <ProfileCard 
            name='Alexander Wittenby'
            image='/milad.jpg'
            description='Alexander '/>
          </CarouselItem>
          <CarouselItem className="lg:basis-1/3 md:basis-1/2 basis-full">
            <ProfileCard 
            name='Johan Olofsson'
            image='/milad.jpg'
            description='Johan'/>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        

      </Carousel>
    </div>
  )
}