import { ethers, Contract } from "ethers";
import { BastionSignerOptions } from "../../../src/modules/connector";
import { arbitrumGoerli } from "viem/chains";
import { BastionWalletConnector } from "../../../src/index";
import { describe, beforeEach, it, expect } from "@jest/globals";
import { skip } from "node:test";

let walletConnected;
let provider;

const DEFAULT_CONFIG: BastionSignerOptions = {
	privateKey: process.env.PRIVATE_KEY || "",
	// rpcUrl: process.env.RPC_URL1 || "", //mumbai
	// chainId: 80001,
	rpcUrl: process.env.RPC_URL2 || "", // arb-goerli
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
		let connector = new BastionWalletConnector({ chains: [arbitrumGoerli], options: DEFAULT_CONFIG });
		// const provider = await connector.bastionCustomConnector.getProvider();
		// console.log(provider);

		console.log("Test done");
		// await expect(bastionConnect.init(provider, DEFAULT_CONFIG)).rejects.toThrow("Chain not supported");
	});
});

