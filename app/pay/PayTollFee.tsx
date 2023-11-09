import * as React from 'react';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { tollABI, tollContractAddr } from '@/contracts/ABI';
import { parseEther } from 'viem';
import Link from 'next/link';

export default function PayTollFee() {

  const { config, 
      error: prepareError, 
      isError: isPrepareError
     } = usePrepareContractWrite({
        address: tollContractAddr,
        abi: tollABI,
        functionName: 'payFee',
        value: parseEther('0.0005'),
    });
    const { data, error, isError, write } = useContractWrite(config);

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    });

  return (
    <div>
      <div className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 m-2 rounded'>
        <button disabled={!write || isLoading} onClick={() => write()}>
            {isLoading ? 'Processing Txn...' : 'Pay Toll Fee'}
        </button>
      </div>
        {isSuccess && (
        <div>
            Successfully paid your toll fee!
            <div>
                <Link href={`https://sepolia.etherscan.io/tx/${data?.hash}`} target='blank'>Click to check txn on Sepolia Etherscan</Link>
            </div>
        </div>
        )}
        {(isPrepareError || isError) && (
        <div>Error: {(prepareError || error)?.message}</div>
      )}
    </div>
  )
}
