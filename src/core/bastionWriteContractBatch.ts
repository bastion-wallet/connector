import { Hash } from '@wagmi/core'


export type writeRequest = {
    contractAddress: string,
    abi: any,
    functionName : string,
    args? : any,
    value?:string
}

export type WriteContractBatch = {
  account : Hash,
  writeRequests : writeRequest[]
  bastion? : any
}


export async function bastionWriteContractBatch(data : WriteContractBatch) {
    try{
        const {account, writeRequests, bastion} = data;
        const requests = [];

        for(let eachContract of writeRequests){
            const {contractAddress, abi, functionName, value, args} =  eachContract
            const { request } = await bastion.publicClient.simulateContract({
                account,
                address: contractAddress,
                abi: abi,
                functionName,
                value: value || "0",
                args: args
            })
            requests.push(request)

        }
        
        const hash = await bastion.writeContractBatch(requests)
        console.log("hash", hash)
        return hash;
    }catch(err){
        console.log("error", err)
    }
}




  
