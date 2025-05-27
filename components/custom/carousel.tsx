"use client";
import React from 'react'
import ProfileCard from '@/components/custom/profileCard'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
const Karusell = () => {
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
      )
    return (
        <Carousel
            plugins={[plugin.current]}
            opts={{ align: "start", loop: true}}
            className="w-full h-96">
            <CarouselContent className="flex ">
            <CarouselItem className="lg:basis-1/3 md:basis-1/2 basis-full">
            <ProfileCard 
            name='Erik Leopold Jacobsen'
            image='/milad.jpg'
            description='Erik '
            info={['C++','React.js','Next.js','TypeScript','SQL']} /></CarouselItem>
            <CarouselItem className="lg:basis-1/3 md:basis-1/2 basis-full">
                <ProfileCard 
                name='Isak Klaesson'
                image='/milad.jpg'
                description='Isak '
                info={['C++','React.js','Next.js','TypeScript','SQL']} />
            </CarouselItem>
            <CarouselItem className="lg:basis-1/3 md:basis-1/2 basis-full">
                <ProfileCard 
                name='Alexander Wittenby'
                image='/milad.jpg'
                description='Alexander'
                info={['Python','React.js','Next.js','TypeScript','SQL']}/>
            </CarouselItem>
            <CarouselItem className="lg:basis-1/3 md:basis-1/2 basis-full">
                <ProfileCard 
                name='Johan Olofsson'
                image='/milad.jpg'
                description='Johan'
                info={['C++','React.js','Next.js','TypeScript','SQL']}/>
            </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            

        </Carousel>
    )
}

export default Karusell