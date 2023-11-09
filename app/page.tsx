"use client"

import React, { useEffect } from 'react';

export default function Home() {

  function handleClick(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("ono");
  }

  useEffect(() => {
    if (window.ethereum) {
      
    } else {
      console.log("install an ethereum Wallet");
    }
  })

  return (
    <main className="flex h-screen w-screen flex-col items-center p-24">
      <div className="m-2 relative flex place-items-center">
        <form onSubmit={(e : React.FormEvent<HTMLFormElement>) => handleClick(e)}>
          <label htmlFor="tollId">Toll ID</label>
          <input className="m-2 p-2 border border-blue-300 rounded-xl" type='text' name='tollId' />
          <button className=" m-2 p-2 bg-blue-300 rounded-xl" type='submit' >Pay Toll Tax</button>
        </form>
      </div>
    </main>
  )
}
