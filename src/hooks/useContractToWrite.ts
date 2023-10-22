import { useMutation } from 'wagmi';
import { bastionWriteContract } from '../core/bastionWriteContract';

export const useBastionContractWrite = () => {
  const mutationFn = ({
    account,
    contractAddress,
    abi,
    functionName,
    args,
    value,
    bastion
  }: any) => {
  
    return bastionWriteContract({
      account,
      contractAddress,
      abi,
      functionName,
      args,
      value,
      bastion
    })
  }

  const { mutate: writeContract, ...mutationState } = useMutation(mutationFn);
  return {
    writeContract,
    ...mutationState,
  };
}
