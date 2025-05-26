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
        <ProfileCard 
          name='Erik'
          image='/milad.jpg'
          description='Erik är en' />
        <ProfileCard 
          name='Isak'
          image='/milad.jpg'
          description='Isak är en'/>
        <ProfileCard 
          name='Alexander'
          image='/milad.jpg'
          description='Alexander är en'/>
      </div>
    </div>
  )
}