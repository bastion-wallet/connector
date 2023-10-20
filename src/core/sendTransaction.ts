import { ConnectorNotFoundError, Hash, getWalletClient } from '@wagmi/core'
import { Bastion } from "../../sdk/src/index";
import {createPublicClient, createWalletClient, http} from 'viem'
import {polygonMumbai, arbitrumGoerli,scrollTestnet, lineaTestnet, baseGoerli, optimismGoerli} from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'

export interface BastionViemOptions {
	privateKey?: String;
	rpcUrl?: string;
	chainId?: number;
	apiKey: string;
	gasToken?: string;
	noSponsorship?: boolean;
	provider?: any;
}


export type WriteContract = {
  account : Hash,
  contractAddress: string,
  abi: any,
  functionName : string,
  args? : any,
  bastion? : any
}


export async function writeToContract(data : WriteContract) {
    try{
        const {account, contractAddress, abi, functionName, bastion} = data;
        const address = bastion.getAddress()
    
        const { request } = await bastion.publicClient.simulateContract({
                account,
                address: contractAddress,
                abi: abi,
                functionName: 'safeMint',
                args: [address]
            })
    
        const hash = await bastion.writeContract(request)
        console.log("hash", hash)
        return hash;
    }catch(err){
        console.log("error", err)
    }
}




  
