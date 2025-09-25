"use client"
import { motion } from 'framer-motion'
import React from 'react'

// Definera interface
interface AnimationValues {
  initial: { opacity: number; y: number };
  whileInView: { opacity: number; y: number };
  transition: { duration: number };
  viewport: { once: boolean };
}

// Definiera konstanter så att de kan återanvändas
const animationValues: AnimationValues = {
  initial: { opacity: 0, y: -75 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.25 },
  viewport: { once: true }
}


export default function Partner() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-100 to-white py-24'>
      <div className='w-full max-w-7xl mx-auto px-4 2xl:px-0'>
        <h1 className='text-3xl font-bold text-left mb-4 px-4'>VAD GÖR VI<span className='text-red-500'>?</span></h1>
        
        {/* Kort introduktion */}
        <p className='text-gray-700 mb-6 w-full max-w-2xl px-4'>
          Vi är <strong>Nordiskdev</strong>, din techpartner i södra Sverige. Vi erbjuder skräddarsydda digitala lösningar med fokus på kvalitet, innovation och affärsnytta. Tillsammans med våra kunder skapar vi moderna appar, smarta webblösningar.
        </p>

        {/* Grid med webbutveckling som tar två kolumner */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Webbutveckling - tar hela bredden */}
          <motion.div
            initial={animationValues.initial}
            whileInView={animationValues.whileInView}
            transition={animationValues.transition}
            viewport={animationValues.viewport}
            className='bg-white rounded-2xl  border-black/90 border-[2px] p-4 md:col-span-2'
          >
            <h3 className='text-xl font-bold mb-4'>Webbutveckling</h3>
            <p className='text-gray-700 font-semibold'>
              Vill du ha en modern, responsiv och användarvänlig webbplats? 
            </p>
            <p className='text-gray-700'>
              Vi bygger moderna, responsiva och prestandafokuserade webbplatser – oavsett om det handlar om en landningssida, ett CMS eller en fullskalig webbtjänst.
            </p>
            <p className='text-gray-700 pt-2'>
              Med användaren i centrum designar vi lösningar som stärker ditt varumärke och konverterar besökare till kunder.
            </p>
            <div className='flex flex-wrap justify-left gap-2 mt-2 text-sm font-medium text-gray-700 pt-6'>
              <motion.span onClick={() => {window.location.href = "https://react.dev/"}} whileHover={{ scale: 1.05 }} className="bg-[var(--accent)] text-white px-3 py-1 rounded-full">React</motion.span>
              <motion.span onClick={() => {window.location.href = "https://nextjs.org/"}} whileHover={{ scale: 1.05 }} className="bg-[var(--accent)] text-white px-3 py-1 rounded-full">Next.js</motion.span>
              <motion.span onClick={() => {window.location.href = "https://nodejs.org/en"}} whileHover={{ scale: 1.05 }} className="bg-[var(--accent)] text-white px-3 py-1 rounded-full">Node.js</motion.span>
            </div>
          </motion.div>

          {/* Apputveckling */}
          <motion.div
            initial={{ opacity: 0, y: -75 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.2 }}
            viewport={{ once: true }}
            className='bg-white rounded-2xl border-[2px] border-black/90 p-4'
          >
            <h3 className='text-xl font-bold mb-4'>Apputveckling</h3>
            <p className='text-gray-700 font-semibold'>
              Har du en idé till en app men vet inte hur du ska gå vidare? Vi hjälper dig att ta nästa steg.
            </p>
            <p className='text-gray-700 pt-2'>
              Hos oss får du stöd genom hela processen – från inspiration och idégenerering till design, utveckling och lansering.
            </p>
            <motion.div className='flex flex-wrap justify-left gap-2 mt-2 text-sm font-medium text-gray-700 pt-38'>
              {/*Jiggle animation while hovering*/}
              <motion.span onClick={() => {window.location.href = "https://reactnative.dev/"}} whileHover={{ scale: 1.05 }} className='bg-[var(--accent)] text-white px-3 py-1 rounded-full'>React Native</motion.span>
              <motion.span onClick={() => {window.location.href = "https://www.android.com/"}} whileHover={{ scale: 1.05 }} className='bg-[var(--accent)] text-white px-3 py-1 rounded-full'>Android</motion.span>
              <motion.span onClick={() => {window.location.href = "https://www.apple.com/os/ios/"}} whileHover={{ scale: 1.05 }} className='bg-[var(--accent)] text-white px-3 py-1 rounded-full'>iOS</motion.span>
            </motion.div>
          </motion.div>

          {/* Konsulttjänster */}
          <motion.div
            initial={{ opacity: 0, y: -75 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.4 }}
            viewport={{ once: true }}
            className='bg-white rounded-2xl border-[2px] border-black/90 p-4'
          >
            <h3 className='text-xl font-bold mb-4'>Datahantering</h3>
            <p className='text-gray-700'>
              Vi erbjuder robusta och skalbara lösningar för datahantering – med fokus på struktur, tillgänglighet och säkerhet.
            </p>
            <p className='text-gray-700 pt-2'>
              Vi har erfarenhet av både SQL- och NoSQL-databaser, bland annat <strong>MySQL</strong>, <strong>MariaDB</strong>, <strong>MongoDB</strong> och <strong>Firebase</strong>. 
              Vi använder även <strong>GraphQL</strong> och REST för att bygga flexibla och effektiva API-lösningar.
            </p>
            <p className='text-gray-700 pt-2'>
              Vi kan hosta och hantera databasen åt er i molnet – eller hjälpa er sätta upp en lösning på egen server eller valfri hostingplattform. Ni väljer, vi ser till att det fungerar.
            </p>
            <div className='flex flex-wrap justify-left gap-2 mt-2 text-sm font-medium text-gray-700 pt-12'>
            <motion.span onClick={() => {window.location.href = "https://reactnative.dev/"}} whileHover={{ scale: 1.05 }} className='bg-[var(--accent)] text-white px-3 py-1 rounded-full'>MySQL</motion.span>
              <motion.span onClick={() => {window.location.href = "https://mariadb.org/"}} whileHover={{ scale: 1.05 }} className='bg-[var(--accent)] text-white px-3 py-1 rounded-full'>MariaDB</motion.span>
              <motion.span onClick={() => {window.location.href = "https://www.mongodb.com"}} whileHover={{ scale: 1.05 }} className='bg-[var(--accent)] text-white px-3 py-1 rounded-full'>MongoDB</motion.span>
              <motion.span onClick={() => {window.location.href = "https://nodejs.org/"}} whileHover={{ scale: 1.05 }} className='bg-[var(--accent)] text-white px-3 py-1 rounded-full'>Firebase</motion.span>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}