import React from 'react'

interface ProfileCardProps {
  name: string;
  image: string;
  description: string;
  info?: string[];
}
const profileCard = ({name, image, description,info}: ProfileCardProps) => {

  const backgroundColors = [
    'bg-blue-100',
    'bg-green-100',
    'bg-red-100',
    'bg-yellow-100',
    'bg-purple-100',
    'bg-gray-100',
    
  ];
  const randomColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
  return (
    <div>
        <div className="mt-14 shadow-lg rounded-lg p-8 max-w-sm mx-auto select-none ">
            <div className={`relative h-[300px] flex items-center justify-left ${randomColor}  border-b-2 border-gray-200 rounded-r-2xl rounded-tl-4xl rounded-bl-2xl`}>
                <img
                    src={image}
                    alt="Profile Picture"
                    className="w-24 h-24 rounded-full border-4 border-gray-200 shadow-md select-none top-0 left-0 absolute translate-y-[-5%] translate-x-[-5%]  "
                />
                <h1 className="text-2xl font-bold mt-4 ml-4">{name}</h1>
                <p>
                    <span className="text-gray-600 text-sm">{description}</span>
                </p>
                {info && info.length > 0 && (
                    <div className={`absolute bg-white mt-2 justify-start bottom-0 left-0  p-2 rounded-b-2xl w-full  `}> 
                        
                        <ul className="list-none text-gray-700 flex flex-row md:flex-row sm:flex-row flex-wrap items-start gap-2">
                            {info.map((skill, index) => (
                                <li className='bg-black text-white rounded p-0.5 justify-evenly flex ' key={index}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    </div>

    
  )
}

export default profileCard