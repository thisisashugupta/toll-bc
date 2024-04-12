import React from 'react'
import Link from 'next/link'

type LinkTabProps = {
  children: string,
  href: string
}

function LinkTab({ children, href }: LinkTabProps) {

  return (
      <Link 
        href={href}
        className='border-2 border-sky-300 rounded-xl p-2 m-2 hover:bg-sky-300 text-center max-w-[250px]' 
      >
        {children}
      </Link>
  )
}

export default LinkTab