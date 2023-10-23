import { useMutation } from 'wagmi';
import { bastionWriteContractBatch } from '../core/bastionWriteContractBatch';
import { Hash } from 'viem';

export type writeContracts = {
    contractAddress: string,
    abi: any,
    functionName : string,
    args? : any,
    value?:string
}

export type WriteContractBatch = {
    account : Hash,
    writeContracts : [writeContracts]
    bastion? : any
}
  

export const useBastionContractWriteBatch = () => {
  const mutationFn = ({
    account,
    writeContracts : [writeContracts],
    bastion
  }: any) => {

    const WriteContractBatch : WriteContractBatch = {
        account, 
        writeContracts : [writeContracts], 
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
