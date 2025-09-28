import React from 'react'

const team = [
  {
    name: 'Erik',
    title: 'Software Engineer',
    img: '/erik.jpg',
    info: "Software engineer med ett hjärta för struktur och prestanda. Har koll på hela stacken men trivs extra bra i backend-miljöer där logiken sitter i centrum. Kodar helst i TypeScript och gillar att bygga robusta, skalbara lösningar som håller i längden." // Byt till egen bild
  },
  {
    name: 'Isak',
    title: 'Software Engineer',
    img: '/isak.png',
    info: "Software engineer som gillar problemlösning, teknik och att få olika system att snacka med varandra. Rör sig smidigt mellan frontend och backend och ser alltid till att leverera lösningar som faktiskt skapar värde – inte bara ser bra ut på pappret." // Byt till egen bild
  },
  {
    name: 'Alexander',
    title: 'Webbutvecklare',
    img: '/alex.jpg',
    info: "Frontend-fantast som brinner för användarupplevelse och visuell design. Jobbar helst i React och Next.js, gärna med fokus på detaljer och ett tydligt, modernt gränssnitt. Ser till att det inte bara funkar – det ska också kännas bra att använda."
  },
]

const Utvecklare = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-100 to-white py-24 ">
      <div className="w-full max-w-7xl mb-12 lg:px-6 px-6 2xl:px-0 ">  
        <h1 className="text-2xl  text-left leading-8 max-w-xl text-black-500 px-12">
          Våra<span className='text-[var(--accent)]'> Utvecklare.</span>
        </h1>
      </div>
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 sm:grid-cols-1 md:grid-cols-2">
          {team.map((person) => (
            <div
              key={person.name}
              className="bg-white flex flex-col items-center p-8 mx-auto"
            >
              <img
                src={person.img}
                alt={person.name}
                className="w-80 h-80 object-cover border-4 border-gray-300 mb-6 shadow-md"
              />
              <h3 className="text-xl font-bold mb-2">{person.name}</h3>
              <p className="text-gray-600">{person.title}</p>
              <p className="text-gray-500 mt-4 text-center">{person.info}</p>
              <div className="flex flex-wrap justify-center gap-2 mt-2 text-sm font-medium text-gray-700">
                <span className="bg-[var(--accent)] text-white px-3 py-1 rounded-full">TypeScript</span>
                <span className="bg-[var(--accent)] text-white px-3 py-1 rounded-full">React</span>
                <span className="bg-[var(--accent)] text-white px-3 py-1 rounded-full">Next.js</span>
                <span className="bg-[var(--accent)] text-white px-3 py-1 rounded-full">Node.js</span>
                <span className="bg-[var(--accent)] text-white px-3 py-1 rounded-full">Tailwind CSS</span>
                <span className="bg-[var(--accent)] text-white px-3 py-1 rounded-full">GraphQL</span>
                <span className={person.name == "Isak" ? "bg-[var(--accent)] text-white px-3 py-1 rounded-full" : "hidden"}>C++</span>
                <span className={person.name == "Erik" ? "bg-[var(--accent)] text-white px-3 py-1 rounded-full" : "hidden"}>C++</span>
                <span className={person.name == "Alexander" ? "bg-[var(--accent)] text-white px-3 py-1 rounded-full" : "hidden"}>AWS</span>

              </div>
            </div>
          ))}
          
          
        </div>
      </div>
    </div>
  )
}

export default Utvecklare