import { useMutation } from 'wagmi';
import { bastionWriteContractBatch } from '../core/bastionWriteContractBatch';
import { Hash } from 'viem';

export type writeRequest = {
    contractAddress: string,
    abi: any,
    functionName : string,
    args? : any,
    value?:string
}

export type WriteContractBatch = {
    account : Hash,
    writeRequests:writeRequest[],
    bastion? : any
}
  

export const useBastionContractWriteBatch = () => {
  const mutationFn = ({
    account,
    writeRequests,
    bastion
  }: any) => {
    console.log("writes", writeRequests)
    const WriteContractBatch : WriteContractBatch = {
        account, 
        writeRequests, 
        bastion
    }
  
    return bastionWriteContractBatch(
        WriteContractBatch
    )
  }

  const { mutate: writeContractBatch, ...mutationState } = useMutation(mutationFn);
  return {
    writeContractBatch,
    ...mutationState,
  };
}
