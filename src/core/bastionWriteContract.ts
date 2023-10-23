import {Hash} from '@wagmi/core'


export type WriteContract = {
  account : Hash,
  contractAddress: string,
  abi: any,
  functionName : string,
  args? : any,
  value?:string
  bastion? : any
}


export async function bastionWriteContract(data : WriteContract) {
    try{
        const {account, contractAddress, abi, functionName, args, value, bastion} = data;
        const { request } = await bastion.publicClient.simulateContract({
                account,
                address: contractAddress,
                abi: abi,
                functionName,
                value: value || "0",
                args: args
            })
    
        const hash = await bastion.writeContract(request)
        console.log("hash", hash)
        return hash;
    }catch(err){
        console.log("error", err)
    }
}




  
