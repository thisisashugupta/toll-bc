"use client"

import React, { useEffect } from 'react';

export default function Home() {

  function handleClick(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("ono");
  }

  if (!(window.ethereum)) {
    return (<div>install an ethereum wallet</div>);
  }

  return (
    <main className="flex h-screen border-2 border-red-600 flex-col justify-center items-center p-4">
      <div className="m-2 relative flex items-center">
        <form onSubmit={(e : React.FormEvent<HTMLFormElement>) => handleClick(e)}>
          <label htmlFor="tollId">Toll ID</label>
          <input className="m-2 p-2 border border-blue-300 rounded-xl" type='text' name='tollId' />
          <button className=" m-2 p-2 bg-blue-300 rounded-xl" type='submit' >Pay Toll Tax</button>
        </form>
      </div>
    </main>
  )
}
