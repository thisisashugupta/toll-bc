"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAccount, useConnect } from 'wagmi';
import QRCode from 'qrcode';

export default function Home() {

  const { address, isConnected, isConnecting, isDisconnected, connector: activeConnector } = useAccount();
  // const { connect, connectors, error, isLoading, pendingConnector } = useConnect()

  const [id, setId] = useState<string>("");
  const [src, setSrc] = useState<string>("");

  const generate = () => {
    QRCode.toDataURL(`http://localhost:3000/${address}`).then(setSrc);
  }
  //  QRCode.toDataURL('I am a pony!', function (err, url) {
  //   console.log(url)
  // })

  function handleClick(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    generate();
    console.log("QR generated.");
  }

  if (isDisconnected) {
    return (<div>Connect to Sepolia wallet</div>);
  }

  return (
    <main className="flex h-screen flex-col justify-around items-center p-4">

      <div className="flex">
        <div className='border-2 border-sky-300 rounded-xl p-2 m-2 hover:bg-sky-300 text-center max-w-[250px]'><Link href="/toll-manager">Manage Toll</Link></div>
        <div className='border-2 border-sky-300 rounded-xl p-2 m-2 hover:bg-sky-300 text-center max-w-[250px]'><Link href="/pay">Pay Toll</Link></div>
      </div>

      <div>
        <form className='flex-col items-center justify-center' onSubmit={(e : React.FormEvent<HTMLFormElement>) => handleClick(e)}>
          <div className='flex justify-between items-center'>
            <label htmlFor="vehnum">vehnum</label>
            <input className="m-2 p-2 border border-blue-300 rounded-xl" type='text' name='vehnum' placeholder='RJ45CD8008' onChange={(e) => setId(e.target.value)} />
          </div>
          <div className='flex justify-between items-center'>
            <label htmlFor="vehtype">vehtype</label>
            <input className="m-2 p-2 border border-blue-300 rounded-xl" type='text' name='vehtype' placeholder='car' onChange={(e) => setId(e.target.value)} />
          </div>
          <div className='flex justify-between items-center'>
            <label htmlFor="vehmodel">vehmodel</label>
            <input className="m-2 p-2 border border-blue-300 rounded-xl" type='text' name='vehmodel' placeholder='Honda City' onChange={(e) => setId(e.target.value)} />
          </div>
          <div className='flex justify-center items-center'>
            <button className=" m-2 p-2 bg-blue-300 rounded-xl" type='submit' >Generate QR</button>
          </div>
        </form>
      </div>

      <div className='flex justify-center items-center'>
        <Image src={src} alt="qr_code" width={250} height={250}/>
      </div>
      
    </main>
  )
}
