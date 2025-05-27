import React from 'react'

interface ProfileCardProps {
  name: string;
  image: string;
  description: string;
}
const profileCard = ({name, image, description}: ProfileCardProps) => {
  return (
    <div>
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm mx-auto select-none">
            <div className='relative h-[200px] flex items-center justify-left bg-gray-300 border-b-2 border-gray-200 rounded-r-2xl'>
                <img
                    src={image}
                    alt="Profile Picture"
                    className="w-24 h-24 rounded-full border-4 border-gray-200 shadow-md select-none top-0 left-0 absolute"
                />
                <h1 className="text-2xl font-bold mt-4 ml-4">{name}</h1>
                <p>
                    <span className="text-gray-600 text-sm">{description}</span>
                </p>
            </div>
        </div>
    </div>

    
  )
}

export default profileCard