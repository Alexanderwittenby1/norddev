import React from 'react';

const Hero = () => {
  return (
    <div className="relative w-full min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/NordDev.png)' }}>
      <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold">ER VISION <span className='text-5xl font-extrabold text-amber-900'>VÅR UTMANING</span></h1>
          {/* <p className="mt-4 text-lg">VÅR UTMANING</p> */}
          {/* <a href="#cta" className="mt-6 inline-block px-6 py-3 text-lg font-semibold text-white bg-red-700 rounded hover:bg-red-600">
            Get Started
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;