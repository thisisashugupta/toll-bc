import React from 'react'

export function Title({children} : {children: string}) {
  return (
    <p className="text-xl font-bold flex justify-center p-6">
        {children}
    </p>
  )
}