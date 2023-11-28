"use client"

import React from 'react'
import { useContractRead } from 'wagmi'
import { tollPlazaABI, tollPlazaContractAddr } from '@/contracts/ABI'

function GetOwner() {

    const { data, isError, error } = useContractRead({
        address: tollPlazaContractAddr,
        abi: tollPlazaABI,
        functionName: 'get_owner'
    });

    if (isError) { console.error(error) };
    console.log(data);

  return (<>
    <div className='space-x-4 space-y-2 border border-blue-500 p-4 rounded'>
        <div>get_owner</div>
        <div>{`${data}`}</div>
    </div>
    </>
  )
}

export default GetOwner;

/*
    function get_owner() public view returns(address){
        return owner;
    }
*/