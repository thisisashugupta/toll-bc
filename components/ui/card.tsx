import React from 'react'

export default function Card({children} : {children: React.ReactNode}) {
  return (
    <div className='flex flex-col items-center justify-center space-x-4 space-y-2 border border-blue-500 p-4 rounded-xl'>
        {children}
    </div>
  )
}