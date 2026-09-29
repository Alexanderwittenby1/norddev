import React from 'react'
import { KontaktForm } from '@/components/custom/kontakt'

export const metadata = {
  title: "Kontakt - NordiskDev",
  description: "Kontakta NordiskDev för frågor, samarbeten eller offertförfrågningar.",
};

const page = () => {
  return (
    <>
        <KontaktForm />
    </>
    
  )
}

export default page