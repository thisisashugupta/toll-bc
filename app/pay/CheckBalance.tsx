// "use client"

import React, { useState, useEffect } from 'react'
import { useAccount, useNetwork, useContractRead } from 'wagmi'
import { tollPlazaABI, tollPlazaContractAddr } from '../../contracts/ABI'

// function check_balance() public view returns(uint){}

const CheckBalance : React.FC = () => {

    const [balanceWei, setBalanceWei] = useState<number>(0);
    const [balanceEther, setBalanceEther] = useState<number>(0);

    const { address } = useAccount();

    const { data, isError, error, isLoading } = useContractRead({
        address: tollPlazaContractAddr,
        abi: tollPlazaABI,
        functionName: 'check_balance',
        account: address,
      })
    if (isError) { console.error(error) };

    useEffect(() => {
        let balanceWeiNumber = Number(data);
        setBalanceWei(balanceWeiNumber);
        let ethbalance : number = balanceWeiNumber / 1000000000000000000;
        setBalanceEther(ethbalance);
    }, [data])

    
  
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            console.log('Sending Tx')
        } catch (error) {
            console.warn({ title: 'Error'});
        }
    };


    const [isReady, setIsReady] = useState<boolean>(false);
    const [connected, setConnected] = useState<boolean>(false);

    const { chain } = useNetwork()

    useEffect(() => {
        if (chain?.name === "Sepolia") setConnected(true);
        setIsReady(true);
    }, [chain?.name]);

    return (
        <main className='flex-col items-center p-12 border border-blue-500 rounded-lg'>
            {!connected && (<div>Please connect to Sepolia</div>)}
            {connected && (<div>
                {!isReady && <>Loading...</>}
                {isReady && 
                (<div className="flex flex-col place-items-center space-y-4">
                    <div>CheckBalance</div>
                    <div>Balance: {`${balanceEther}`} Ether</div>
                    <div>({`${balanceWei}`} Wei)</div>
                    
                </div>)}
            </div>)}
        </main>
    );
}    

export default CheckBalance;