// "use client"

import React, { useState, useEffect } from 'react'
import { useNetwork } from 'wagmi'
import { readContract } from '@wagmi/core'
import { sendTransaction, prepareSendTransaction } from '@wagmi/core'
import { parseEther } from 'viem'
import { tollABI, tollContractAddr } from '../../contracts/ABI'

const PayTollFee : React.FC = () => {

    const [tollFeeETH, setTollFeeETH] = React.useState<number>(0);
    const [isReady, setIsReady] = React.useState<boolean>(false);
    const [connected, setConnected] = React.useState<boolean>(false);
    const { chain, chains } = useNetwork()

    const justSendEth = async () => {
        const config = await prepareSendTransaction({
            //   account: '0x0c093868DAC0514B99e4d4CfB0880ee5Fa5A711B', // from account
              to: '0x3e05a78FCc3185ADaCFd8f5C071119B031CeC962',
              value: parseEther('0.01')
        });
        const { hash } = await sendTransaction(config);
        console.log(`hash: ${hash}`);
    }

    useEffect(() => {
        if (chain?.name === "Sepolia") setConnected(true);
    })

    useEffect(() => {

        async function getTollFee() { // contract function call to sample contract
            const data : bigint = await readContract({
                address: tollContractAddr,
                abi: tollABI,
                functionName: 'fee',
            });
            setTollFeeETH(Number(data / 10n**9n)/10**9);
            setIsReady(true);
        }
        connected && getTollFee();

    },[connected])

    if (!(window.ethereum)) {
        return (
        <main className="flex flex-col w-screen items-center p-24">
            <div>install an ethereum wallet</div>
        </main>
        )
    }

    return (
        <main className='flex flex-col items-center p-12 border border-blue-500 rounded-lg mt-2'>
            {!connected && (<div>Please connect to Sepolia</div>)}
            {connected && (<div>
                {!isReady && <>Loading...</>}
                {isReady && 
                (<div className="m-2 relative flex place-items-center flex-col">
                    <div><p>Toll Fee: {`${tollFeeETH}`} ETH</p></div>
                    <div className='border border-blue-400 hover:bg-blue-400 p-2 rounded-lg mt-2'><button>Send ETH</button></div>
                </div>)}
            </div>)}
        </main>
    )
}

export default PayTollFee;