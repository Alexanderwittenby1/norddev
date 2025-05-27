
import React from 'react'
import Hero from '@/components/custom/hero'
import Karusell from '@/components/custom/carousel'


export default function Page() {
  
  return (
    <div className="relative">
      <Hero 
      image='/milad.jpg'
      title='VÅRA' 
      span='UTVECKLARE'/>
      <Karusell/>
    </div>
  )
}