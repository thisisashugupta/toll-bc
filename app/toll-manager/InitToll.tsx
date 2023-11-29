"use client"

import React, { useEffect, useState } from 'react'
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import { tollPlazaABI, tollPlazaContractAddr } from '@/contracts/ABI'

function InitToll() {

    const [args, setArgs] = useState<[string, string]>(["",""]);
    const [tollName, setTollName] = useState<string>("");
    const [tollId, setTollId] = useState<string>("");

    useEffect(() => {
        setArgs([tollName, tollId]);
    }, [tollName,tollId]);

    const { config, isError, error } = usePrepareContractWrite({
        address: tollPlazaContractAddr,
        abi: tollPlazaABI,
        functionName: 'Init_Toll',
        args: args
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
            console.log(args)
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

  return (<>
    <div className='flex flex-col items-center justify-center space-x-4 space-y-2 border border-blue-500 p-4 rounded-xl'>
        <div>Init_Toll</div>
        <div className='flex items-center justify-between space-x-4 rounded-xl'>
            <label htmlFor="tollid">tollid</label>
            <input className='border border-blue-300 rounded-xl p-2' type="text" name="tollid" placeholder='1' onChange={e => setTollId(e.target.value)}/>
        </div>
        <div className='flex items-center justify-between space-x-4 rounded-xl'>
            <label htmlFor="tollname">tollname</label>
            <input className='border border-blue-300 rounded-xl p-2' type="text" name="tollname" placeholder='toll1' onChange={e => setTollName(e.target.value)}/>
        </div>
        <button className='bg-blue-300 p-2 rounded-xl' onClick={handleSubmit}>create toll</button> 
    </div>
    </>
  )
}

export default InitToll;

/*
    function Init_Toll(string memory _name,string memory _id) onlyOwner public {}
*/