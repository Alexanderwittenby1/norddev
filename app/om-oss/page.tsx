import React from 'react'
import Hero from '@/components/custom/hero'
import ProfileCard from '@/components/custom/profileCard'

export default function Page() {
  return (
    <div className="relative">
      <Hero 
      image='/milad.jpg'
      title='VÅRA' 
      span='UTVECKLARE'/>
      <div className="">
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
      </div>
    </div>
  )
}