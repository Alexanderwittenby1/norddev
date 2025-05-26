import React from 'react';


interface HeroProps {
  image: string;
  title: string;
  span: string;
}

const Hero = ({ image, title, span }: HeroProps) => {
 
  return (
    <>
    <main>
      
      <div className="relative w-full min-h-screen bg-cover bg-center " style={{ backgroundImage: `url(${image})` }}>
        <div className="absolute inset-0 flex items-center justify-center bg-transparent bg-opacity-50">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold select-none">{title} <span className='text-5xl font-extrabold text-amber-900'>{span}</span></h1>
            
          </div>
        </div>
      </div>
      
    </main>
    </>
  );
};

export default Hero;