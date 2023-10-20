import * as React from 'react'
import { useMutation } from 'wagmi';
import { writeToContract } from '../core/sendTransaction';

export const mutationKey = (args: any) =>
  [{ entity: 'writeToContract', ...args }] as const

const mutationFn = ({
  account,
  contractAddress,
  abi,
  functionName,
  args
}: any) => {
  // if (!to) throw new Error('to is required.')

  return writeToContract({
    account,
    contractAddress,
    abi,
    functionName,
    args
  })
}


export function useContractToWrite(
  account,
  contractAddress,
  abi,
  functionName,
  args,
  // onError,
  // onMutate,
  // onSettled,
  // onSuccess,
) {
  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
    status,
    variables,
  } = useMutation(
    mutationKey({
      account,
      contractAddress,
      abi,
      functionName,
      args,
    }),
    // mutationFn,
    // {
    //   onError,
    //   onMutate,
    //   onSettled,
    //   onSuccess,
    // },
  )

  const writeToContract = React.useCallback(
    (args?: any) =>
      mutate({

        ...(args || {
          account,
          contractAddress,
          abi,
          functionName,
          args,
        }),
      }),
    [
      account,
      contractAddress,
      abi,
      mutate,
      functionName,
      args
    ],
  )

  const writeToContractAsync = React.useCallback(
    (args?: any) =>
      mutateAsync({
        ...(args || {
          account,
          contractAddress,
          abi,
          functionName,
          args
        }),
      }),
    [
      account,
      contractAddress,
      abi,
      mutateAsync,
      functionName,
      args
    ],
  )


  return {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    writeToContract: writeToContract,
    writeToContractAsync: writeToContractAsync,
    status,
    variables,
  }
}