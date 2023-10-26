import { BastionOptions } from "../src/bastionWallet";
import { arbitrumGoerli } from "viem/chains";
import { BastionCustomConnector } from "../src/bastionWallet";
import { describe, beforeEach, it, expect } from "@jest/globals";
import { skip } from "node:test";
import {abi} from "./abi"  ;

import {BastionWalletConnector} from "../src/index"
let walletConnected;
let provider;

const DEFAULT_CONFIG: BastionOptions = {
	privateKey: process.env.PRIVATE_KEY as `0x${string}`,
	// rpcUrl: process.env.RPC_URL1 || "", //mumbai
	// chainId: 80001,
	rpcUrl: process.env.RPC_URL_ARB_GOERLI || "", // arb-goerli
	chainId: 421613,
	// rpcUrl: process.env.RPC_URL3 || "", // scroll
	// chainId: 534353,
	// rpcUrl: process.env.RPC_URL4 || "", // linea
	// chainId: 59140,
	// rpcUrl: process.env.RPC_URL5 || "", // base-goerli
	// chainId: 84531,
	// rpcUrl: process.env.RPC_URL6 || "", // optimism-goerli
	// chainId: 420,
	apiKey: process.env.BASTION_API_KEY || "",
};

describe("setupConnector", () => {
	beforeEach(() => {});
	const expectedAddress = "0xB730d07F4c928AD9e72B59AB99d22cB87BE9A867"; // replace with actual expected address

	it("should create a new wallet connector object and return provider", async () => {
		let connector = new BastionCustomConnector({ chains: [arbitrumGoerli], options: DEFAULT_CONFIG });
		const provider = await connector.getProvider();
		expect(provider._isProvider).toBe(true);
	});
	it("should return the chain Id", async () => {
		// let connector = new BastionWalletConnector({ chains: [arbitrumGoerli], options: DEFAULT_CONFIG });
		let connector = new BastionCustomConnector({ chains: [arbitrumGoerli], options: DEFAULT_CONFIG });
		const chainId = await connector.getChainId();
		const res = await connector.connect({chainId});
		console.log("res",res)

		expect(res.chain.id).toBe(421613);
	}, 70000);

	it("should return connector data", async() => {
		let connector = new BastionCustomConnector({ chains : [arbitrumGoerli], options: DEFAULT_CONFIG });
		const chainId = await connector.getChainId();
		const res = await connector.connect({chainId});
		console.log(res)
		expect(res).toHaveProperty('bastion');
		expect(res).toHaveProperty('account');
		expect(res).toHaveProperty('chain');
	})

	it("should return walletClient", async() => {
		let connector = new BastionCustomConnector({ chains : [arbitrumGoerli], options: DEFAULT_CONFIG });
		const res =  await connector.getWalletClient()
		console.log(res)
	})

	
	it("should get the account address", async() =>{
		let connector = new BastionCustomConnector({ chains : [arbitrumGoerli], options: DEFAULT_CONFIG });
		const res = await connector.getAccount()

		expect(res).toHaveLength(42);
	})


});

