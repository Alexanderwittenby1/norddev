
import React from 'react';

const Hero = () => {
 
  return (
    <main>
      <div className="relative w-full min-h-screen bg-cover bg-center pt-16" style={{ backgroundImage: "url('/milad.jpg')" }}>
        <div className="absolute inset-0 flex items-center justify-center bg-transparent bg-opacity-50">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold ">ER VISION <span className='text-5xl font-extrabold text-amber-900'>VÅR UTMANING</span></h1>
            
          </div>
        </div>
      </div>
      
    </main>
  );
};

export default Hero;