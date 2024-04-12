"use client"

import React from 'react'
import { useContractRead } from 'wagmi'
import { tollPlazaABI, tollPlazaContractAddr } from '@/contracts/ABI'
import { Title } from '@/components/ui/title'
import Card from '@/components/ui/card'

function GetOwner() {

    const { data, isError, error } = useContractRead({
        address: tollPlazaContractAddr,
        abi: tollPlazaABI,
        functionName: 'get_owner'
    });

    if (isError) { console.error(error) };
    console.log(data);

  return (
    <Card>
        <Title>get_owner</Title>
        <div>Owner Address:</div>
        <div> {`${data}`}</div>
    </Card>
  )
}

export default GetOwner;

/*
    function get_owner() public view returns(address){
        return owner;
    }
*/