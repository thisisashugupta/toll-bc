// "use client"

import React, { useState, useEffect } from 'react'
import { useAccount, useNetwork, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { tollPlazaABI, tollPlazaContractAddr } from '../../contracts/ABI'

// function Pay_Tolltax(string memory _id,string memory _tollname,string memory _vehnum,string memory _type,string memory _vehmodel) public returns(bool){}

const PayTollTax : React.FC = () => {

    const { address } = useAccount();
    console.log(typeof address, address);
    
    const [args, setArgs] = useState<[string, string, string, string, string, string]>(["","","","","",""]);
    // Pay_Tolltax( _id, _tollname, _vehnum, _type, _vehmodel)    
    const [tollId, setTollId] = useState<string>("");
    const [tollName, setTollName] = useState<string>("");
    const [vehnum, setVehnum] = useState<string>("");
    const [vehtype, setVehtype] = useState<string>("");
    const [vehmodel, setVehmodel] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    useEffect(() => {
        setArgs([address as string, tollId, tollName, vehnum, vehtype, vehmodel]);
    }, [address, tollId, tollName, vehnum, vehtype, vehmodel]);

    const { config, isError, error } = usePrepareContractWrite({
        address: tollPlazaContractAddr,
        abi: tollPlazaABI,
        functionName: 'Pay_Tolltax',
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
            setSuccessMessage("TollTax Paid Successfully!");
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


    const [tollFeeETH, setTollFeeETH] = useState<number>(0);
    const [isReady, setIsReady] = useState<boolean>(false);
    const [connected, setConnected] = useState<boolean>(false);

    const { chain, chains } = useNetwork()

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
                    <div>PayTollTax</div>
                    <div>
                        <form className='flex-col justify-around space-y-4' onSubmit={ (e: any) => handleSubmit(e)}>
                            <div className='flex items-center justify-between space-x-4'>
                            <label htmlFor="tollid">tollid</label>
                            <input className='border border-blue-400 rounded-lg p-2 text-black' type="text" name='tollid' placeholder='13' onChange={ (e) => setTollId(e.target.value)}/>
                            </div>
                            <div className='flex items-center justify-between space-x-4'>
                            <label htmlFor="tollname">tollname</label>
                            <input className='border border-blue-400 rounded-lg p-2 text-black' type="text" name='tollname' placeholder='toll13' onChange={ (e) => setTollName(e.target.value)}/>
                            </div>
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
                            <div className='flex items-center justify-center space-x-4'>
                            <button className='border border-blue-400 hover:bg-blue-400 rounded-lg p-2' type='submit'>Pay_Tolltax</button>
                            </div>
                        </form>
                    </div>
                    <div>{successMessage}</div>
                </div>)}
            </div>)}
        </main>
    )
}

export default PayTollTax;