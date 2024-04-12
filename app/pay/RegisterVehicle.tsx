// "use client"

import React, { useState, useEffect } from 'react'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
// import VehicleMenu  from './VehicleMenu'
import { tollPlazaABI, tollPlazaContractAddr } from '../../contracts/ABI'

const RegisterVehicle : React.FC = () => {

    const [isReady, setIsReady] = useState<boolean>(false);
    const [args, setArgs] = useState<[string, string, string]>(["","",""]);
    // Register_Vehicle(_vehnum,_vehtype,_vehmodel)
    const [vehnum, setVehnum] = useState<string>("");
    const [vehtype, setVehtype] = useState<string>("");
    const [vehmodel, setVehmodel] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    useEffect(() => {
        setArgs([vehnum, vehtype, vehmodel]);
    }, [vehnum, vehtype, vehmodel]);

    const { config, isError, error } = usePrepareContractWrite({
        address: tollPlazaContractAddr,
        abi: tollPlazaABI,
        functionName: 'Register_Vehicle',
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
            setSuccessMessage("Vehicle Registered Successfully!");
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
            write?.()
        } catch (error) {
            console.warn({
                title: 'Error',
                description: 'There was an error',
                status: 'error',
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        setIsReady(true);
    }, []);

    return (
        <main className='flex-col items-center p-4 border border-blue-500 rounded-lg'>
            <div>
                {!isReady && <>Loading...</>}
                {isReady && 
                (<div className="flex flex-col place-items-center space-y-4">
                    <div>RegisterVehicle</div>
                    <div>
                        <form className='flex-col justify-around space-y-4' onSubmit={ (e: any) => handleSubmit(e)}>
                            <div className='flex items-center justify-between space-x-4'>
                            <label htmlFor="vehnum">vehnum</label>
                            <input className='border border-blue-400 rounded-lg p-2 text-black' type="text" name='vehnum' placeholder='RJ14CA5995' onChange={ (e) => setVehnum(e.target.value)}/>
                            </div>
                            <div className='flex items-center justify-between space-x-4'>
                            <label htmlFor="vehtype">vehtype</label>
                            {/* <div className='border border-blue-400 bg-white rounded-lg py-2 px-24'><VehicleMenu /></div> */}
                            {/* <input className='border border-blue-400 rounded-lg p-2' type="text" name='vehtype' placeholder='car' onChange={ (e) => setVehtype(e.target.value)} /> */}
                            <select className='border border-blue-400 rounded-lg py-2 px-8 text-black' name="vehtype" onChange={ (e) => setVehtype(e.target.value)}>
                                <option value="car">Car</option>
                                <option value="van">Van</option>
                                <option value="bus">Bus</option>
                            </select>
                            </div>
                            <div className='flex items-center justify-between space-x-4'>
                            <label htmlFor="vehmodel">vehmodel</label>
                            <input className='border border-blue-400 rounded-lg p-2 text-black' type="text" name='vehmodel' placeholder='Honda City' onChange={ (e) => setVehmodel(e.target.value)}/>
                            </div>
                            <div className='flex items-center justify-center space-x-4'>
                            <button className='border border-blue-400 hover:bg-blue-400 rounded-lg p-2' type='submit'>Register_Vehicle</button>
                            </div>
                        </form>
                    </div>
                    <div>{successMessage}</div>
                </div>)}
            </div>
        </main>
    )
}

export default RegisterVehicle;

/*
    function Register_Vehicle(string memory _vehnum,string memory _vehtype,string memory _vehmodel) public {}
*/