'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import QRCode from 'qrcode';

export default function GenerateQR() {

  const { address } = useAccount();

//   state
  const [tollId, setTollId] = useState<string>("");
  const [tollName, setTollName] = useState<string>("");
  const [vehnum, setVehnum] = useState<string>("");
  const [vehtype, setVehtype] = useState<string>("");
  const [vehmodel, setVehmodel] = useState<string>("");
  const [src, setSrc] = useState<string>("");
  const [url, setUrl] = useState<string>("#");
  const [qrGenerated, setQrGenerated] = useState<boolean>(false);

    const generate = () => {
        // const completeUrl = // `${process.env.NEXT_PUBLIC_BASE_URL}/toll-manager/pay?address=${address}&tollid=${tollId}&tollname=${tollName}&vehnum=${vehnum}&vehtype=${vehtype}&vehmodel=${vehmodel}`;
        const encoded_tollName = encodeURIComponent(tollName);
        const encoded_vehmodel = encodeURIComponent(vehmodel);
        // let encoded_url = `${process.env.NEXT_PUBLIC_BASE_URL}/toll-manager/pay?address=${address}&tollid=${tollId}&tollname=${encoded_tollName}&vehnum=${vehnum}&vehtype=${vehtype}&vehmodel=${encoded_vehmodel}`;
        let encoded_url = `${process.env.NEXT_PUBLIC_BASE_URL}/toll-manager/pay?address=${address}&vehnum=${vehnum}&vehtype=${vehtype}&vehmodel=${encoded_vehmodel}`;
        setUrl(encoded_url);
        setQrGenerated(true);
        console.log(encoded_url , encoded_tollName , encoded_vehmodel);
        return QRCode.toDataURL(encoded_url).then(setSrc);
            //  QRCode.toDataURL('I am a pony!', function (err, url) {
            //   console.log(url)
            // })
    };

    const handleClick = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        generate();
        console.log("QR generated.");
    };

  return (<>
    <form 
        className='flex-col justify-around space-y-4' 
        onSubmit={(e : React.FormEvent<HTMLFormElement>) => handleClick(e)}
    >
        <div>Enter vehicle details to generate QR for Toll Payment</div>
          {/* <div className='flex items-center justify-between space-x-4'>
            <label htmlFor="tollid">tollid</label>
            <input className='border border-blue-400 rounded-lg p-2 text-black' type="text" name='tollid' placeholder='13' onChange={ (e) => setTollId(e.target.value)}/>
          </div>
          <div className='flex items-center justify-between space-x-4'>
            <label htmlFor="tollname">tollname</label>
            <input className='border border-blue-400 rounded-lg p-2 text-black' type="text" name='tollname' placeholder='toll13' onChange={ (e) => setTollName(e.target.value)}/>
          </div> */}
          <div className='flex items-center justify-between space-x-4'>
            <label htmlFor="vehnum">vehnum</label>
            <input className='border border-blue-400 rounded-lg p-2 text-black' type="text" name='vehnum' placeholder='RJ14CA5995' onChange={ (e) => setVehnum(e.target.value)}/>
          </div>
          <div className='flex items-center justify-between space-x-4'>
            <label htmlFor="vehtype">vehtype</label>
            <input className='border border-blue-400 rounded-lg p-2 text-black' type="text" name='vehtype' placeholder='car' onChange={ (e) => setVehtype(e.target.value)}/>
          </div>
          <div className='flex items-center justify-between space-x-4'>
            <label htmlFor="vehmodel">vehmodel</label>
            <input className='border border-blue-400 rounded-lg p-2 text-black' type="text" name='vehmodel' placeholder='Honda City' onChange={ (e) => setVehmodel(e.target.value)}/>
          </div>
          <div className='flex justify-center items-center'>
            <button className=" m-2 p-2 bg-blue-300 rounded-xl" type='submit' >Generate QR</button>
          </div>
        </form>

      { qrGenerated && <div className='flex flex-col justify-center items-center'>
        <div><Link href={url} target='_blank'><Image src={src} alt="qr_code" width={250} height={250}/></Link></div>
        <div>click qr to open</div>
      </div>}
      
</>
  )
}
