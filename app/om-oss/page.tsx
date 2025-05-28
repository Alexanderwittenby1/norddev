
import React from 'react'
import Hero from '@/components/custom/hero'
import Karusell from '@/components/custom/carousel'


export default function Page() {
  
  return (
    <div className="relative h-screen">
      <Hero 
      
      title='VÅRA' 
      span='UTVECKLARE'/>
      <Karusell/>
    </div>
  )
}