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
                duration: 9000,
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
                duration: 9000,
                isClosable: true,
            });
        }
    };

  return (<>
    <div className='space-x-4 space-y-2 border border-blue-500 p-4 rounded'>
        <div>Init_Toll</div>
        <label htmlFor="tollid">tollid</label>
        <input type="text" name="tollid" placeholder='tollid' onChange={e => setTollId(e.target.value)}/>
        <br />
        <label htmlFor="tollname">tollname</label>
        <input type="text" name="tollname" placeholder='tollname' onChange={e => setTollName(e.target.value)}/>
        <br />
        <button className='bg-blue-500 p-2 rounded' onClick={handleSubmit}>create toll</button> 
    </div>
    </>
  )
}

export default InitToll;

/*
    function Init_Toll(string memory _name,string memory _id) onlyOwner public {
        Toll memory toll_obj = Toll(_id,_name,block.timestamp);
        Toll_list.push(toll_obj);
    }
*/