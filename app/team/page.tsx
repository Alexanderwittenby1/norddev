
import React from 'react'
import Hero from '@/components/custom/hero'
import Utvecklare from '@/components/custom/utvecklare'


export const metadata = {
  title: 'Om oss - NordiskDev',
  description: 'Lär känna oss, tre sistaårsstudenter som brinner för teknik och digitala lösningar. Vi är dedikerade till att skapa innovativa och användarvänliga produkter som gör skillnad. Läs mer om vår passion för programmering och hur vi kan hjälpa dig med dina projekt.',
};
  


export default function Page() {


  
  return (
    <div className="relative ">
     
      < Utvecklare />

      
      
    </div>
  )
}