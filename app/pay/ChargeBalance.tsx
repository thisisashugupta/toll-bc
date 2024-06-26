// "use client"

import React, { useState, useEffect } from 'react'
import { parseEther } from 'viem'
import { 
    useNetwork, 
    usePrepareContractWrite, 
    useContractWrite, 
    useWaitForTransaction 
} from 'wagmi'
import { tollPlazaABI, tollPlazaContractAddr } from '../../contracts/ABI'
import { Input } from '@/components/ui/input'

const ChargeBalance : React.FC = () => {

    const [valueEther, setValueEther] = useState<string>("0");
    const [successMessage, setSuccessMessage] = useState<string>("");

    const { config, isError, error } = usePrepareContractWrite({
        address: tollPlazaContractAddr,
        abi: tollPlazaABI,
        functionName: 'Charge_balance',
        value: parseEther(valueEther),
    });

    if (isError) { console.error(error) };

    const { data, isLoading: writeLoading, isError: writeError, write } = useContractWrite(config);

    console.log(data, writeLoading, writeError, write);

    const { 
        data: txnData,
        isLoading: isContractLoading,
        isSuccess: writeSuccess,
       } = useWaitForTransaction({
        hash: data?.hash,
    });

    useEffect(() => {
        if (writeSuccess) {
            console.log('Returned Data', data);
            setSuccessMessage("Balance Added Successfully!");
            console.log({
                title: 'Success',
                description: 'Transaction submited successfully',
                status: 'success',
                isClosable: true,
            });
        }
    }, [writeSuccess, data]);
      
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            console.log('Sending Tx')
            if (!!write) {
                await write?.()
            }
        } catch (error) {
            console.warn({
                title: 'Error',
                description: 'There was an error',
                status: 'error',
                isClosable: true,
            });
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
        <main className='flex-col items-center p-4 border border-blue-500 rounded-lg'>
            {!connected && (<div>Please connect to Sepolia</div>)}
            {connected && (<div>
                {!isReady && <>Loading...</>}
                {isReady && 
                (<div className="flex flex-col place-items-center space-y-4">
                    <div>ChargeBalance</div>
                    <div>
                        <form className='flex-col justify-around space-y-4' onSubmit={ (e: any) => handleSubmit(e)}>
                            <div className='flex items-center justify-between space-x-4'>
                            <label htmlFor="valueEther">valueEther</label>
                            <Input type="number" min="0" step="0.00000001" name='valueEther' placeholder='0.00058' onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setValueEther(e.target.value)}/>
                            </div>
                            <div className='flex items-center justify-center space-x-4'>
                            <button className='border border-blue-400 hover:bg-blue-400 rounded-lg p-2' type='submit'>Charge_balance</button>
                            </div>
                        </form>
                    </div>
                    <div>{successMessage}</div>
                </div>)}
            </div>)}
        </main>
    )
}

export default ChargeBalance;

// function Charge_balance() payable public {}