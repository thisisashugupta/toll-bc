"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import QRCode from 'qrcode';

export default function Home() {

  const [id, setId] = useState<string>("");
  const [src, setSrc] = useState<string>("");

  const generate = () => {
    QRCode.toDataURL(`http://localhost:3000/${id}`).then(setSrc);
  }
  //  QRCode.toDataURL('I am a pony!', function (err, url) {
  //   console.log(url)
  // })

  function handleClick(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    generate();
    console.log("ono");
  }

  if (!(window.ethereum)) {
    return (<div>install an ethereum wallet</div>);
  }

  return (
    <main className="flex h-screen flex-col justify-center items-center p-4">

      <div className="m-2 relative">
        <div className='border-2 border-sky-300 rounded-xl p-2 m-2 hover:bg-sky-300 text-center max-w-[250px]'><button>Create New Toll</button></div>
        <div className='border-2 border-sky-300 rounded-xl p-2 m-2 hover:bg-sky-300 text-center max-w-[250px]'><button>Pay Toll</button></div>
      </div>

      <div>
        <form onSubmit={(e : React.FormEvent<HTMLFormElement>) => handleClick(e)}>
          <label htmlFor="tollId">Toll ID</label>
          <input className="m-2 p-2 border border-blue-300 rounded-xl" type='text' name='tollId' onChange={(e) => setId(e.target.value)} />
          <button className=" m-2 p-2 bg-blue-300 rounded-xl" type='submit' >Pay Toll Tax</button>
        </form>
      </div>

      <div>
        <Image src={src} alt="qr_code" width={250} height={250}/>
      </div>
      
    </main>
  )
}
