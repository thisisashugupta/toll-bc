"use client"

import React, { useEffect, useState } from 'react'
import {NextUIProvider} from "@nextui-org/react"
import { useAccount } from 'wagmi'
import PayTollFee from './PayTollFee'
import PayTolltax from './PayTolltax'
import CheckBalance from './CheckBalance'
import ChargeBalance from './ChargeBalance'
import RegisterVehicle from './RegisterVehicle'

const Pay : React.FC = () => {

    const { address, isConnected, isDisconnected } = useAccount();

    const [showCheckBalance, setShowCheckBalance] = useState<boolean>(false);
    const [showChargeBalance, setShowChargeBalance] = useState<boolean>(false);
    const [showRegisterVehicle, setShowRegisterVehicle] = useState<boolean>(false);
    const [showPayTollTax, setShowPayTollTax] = useState<boolean>(false);

    const toggleShowCheckBalanceState = () => {
        setShowChargeBalance(false);
        setShowRegisterVehicle(false);
        setShowPayTollTax(false);
        setShowCheckBalance(!showCheckBalance);
    };
    const toggleShowChargeBalanceState = () => {
        setShowCheckBalance(false);
        setShowRegisterVehicle(false);
        setShowPayTollTax(false);
        setShowChargeBalance(!showChargeBalance);
    };
    const toggleShowRegisterVehicleState = () => {
        setShowCheckBalance(false);
        setShowChargeBalance(false);
        setShowPayTollTax(false);
        setShowRegisterVehicle(!showRegisterVehicle);
    };
    const toggleShowPayTollTaxState = () => {
        setShowCheckBalance(false);
        setShowChargeBalance(false);
        setShowRegisterVehicle(false);
        setShowPayTollTax(!showPayTollTax);
    };

    
  if (!isConnected) {
    return (<div>Connect to Sepolia wallet</div>);
  }

    return (
        <NextUIProvider>
        <main className="flex flex-col flex-wrap w-screen items-center py-12 space-y-4">
        {/* <div className='flex flex-wrap justify-center items-center space-x-4'> */}
        <div className='grid grid-cols-2 justify-center items-center'>
                <button className='border border-blue-300 hover:bg-blue-300 rounded-xl p-2' onClick={toggleShowCheckBalanceState}>CheckBalance</button>
                <button className='border border-blue-300 hover:bg-blue-300 rounded-xl p-2' onClick={toggleShowChargeBalanceState}>ChargeBalance</button>
                <button className='border border-blue-300 hover:bg-blue-300 rounded-xl p-2' onClick={toggleShowRegisterVehicleState}>RegisterVehicle</button>
                <button className='border border-blue-300 hover:bg-blue-300 rounded-xl p-2' onClick={toggleShowPayTollTaxState}>PayTollTax</button>                
            </div>
            {/* <PayTollFee /> */}
            { showCheckBalance && <CheckBalance /> }
            { showChargeBalance && <ChargeBalance /> }
            { showRegisterVehicle && <RegisterVehicle /> }
            { showPayTollTax && <PayTolltax /> }
        </main>
        </NextUIProvider>
    )
}

export default Pay;