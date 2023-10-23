import { Hash } from '@wagmi/core'


export type sendTransaction = {
  to : String,
  value?:string
  bastion? : any
}

export async function bastionSendTransaction(data : sendTransaction) {
    try{
        const {to, value, bastion} = data;
        const hash = await bastion.sendTransaction(to, value)
        
        console.log("hash", hash)
        return hash;
    }catch(err){
        console.log("error", err)
    }
}


  
