import { useMutation } from 'wagmi';
import { bastionSendTransaction } from '../core/bastionSendTransaction';

export const useBastionSendTransaction = () => {
  const mutationFn = ({
    to,
    value,
    bastion
  }: any) => {
  
    return bastionSendTransaction({
      to,
      value,
      bastion
    })
  }

  const { mutate: sendTransaction, ...mutationState } = useMutation(mutationFn);
  return {
    sendTransaction,
    ...mutationState,
  };
}
