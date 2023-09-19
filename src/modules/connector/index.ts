import { Connector, Chain } from "wagmi";
import { JsonRpcProvider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { Bastion } from "bastion-wallet-sdk";

export interface BastionSignerOptions {
	privateKey?: string;
	rpcUrl?: string;
	chainId?: number;
	apiKey: string;
	gasToken?: string;
	noSponsorship?: boolean;
	provider?: JsonRpcProvider;
	middleware?: "ethers" | "viem";
}

export class BastionCustomConnector extends Connector {
	readonly id = "bastionWallet";
	readonly name = "Bastion Wallet";
	readonly ready = true;
	signerOptions: BastionSignerOptions;
	bastionConnect: any = {};

	// constructor(config: { chains?: Chain[]; options: BastionSignerOptions }) {
	constructor(config: any) {
		console.log("BastionCustomConnector constructor");
		super(config);
		this.signerOptions = config.options;
	}

	async getProvider() {
		throw new Error("Method not implemented.");
		// return new ethers.providers.JsonRpcProvider(this.signerOptions.rpcUrl);
	}

	// async connect({ chainId }: { chainId?: number } = {}): Promise<Required<ConnectorData>> {
	async connect({ chainId }: { chainId?: number } = {}): Promise<any> {
		throw new Error("Method not implemented.");
		// let account = "";
		// const bastion = new Bastion();
		// const bastionConnect = await bastion.bastionConnect;
		// if (this.signerOptions.provider) {
		// 	//   await bastionConnect.connect(this.provider);
		// 	await bastionConnect.init(this.signerOptions.provider, {
		// 		chainId: this.signerOptions.chainId,
		// 		apiKey: this.signerOptions.apiKey,
		// 	});
		// 	account = await bastionConnect.getAddress();
		// 	this.bastionConnect = bastionConnect;
		// }
		// return {
		// 	account: account as `0x${string}`,
		// 	chain: {
		// 		id: 80001,
		// 		unsupported: false,
		// 	},
		// };
	}
	//   async connect() {
	//     const bastion = new Bastion();
	//     const bastionConnect = await bastion.bastionConnect;
	//     if (this.provider) {
	//       bastionConnect.connect(this.provider);
	//     }
	//     return;
	//   }

	// Implement other methods
	// connect, disconnect, getAccount, etc.

	async disconnect() {}

	async getAccount() {
		const account = await this.bastionConnect.getAccount();
		return account;
	}

	getChainId(): Promise<number> {
		throw new Error("Method not implemented.");
	}

	getWalletClient(): any {
		throw new Error("Method not implemented.");
	}
	isAuthorized(): Promise<boolean> {
		return this.bastionConnect.isAuthorized;
		// throw new Error("Method not implemented.");
	}
	protected onAccountsChanged(accounts: `0x${string}`[]): void {
		throw new Error("Method not implemented.");
	}
	protected onChainChanged(chain: string | number): void {
		throw new Error("Method not implemented.");
	}
	protected onDisconnect(error: Error): void {
		throw new Error("Method not implemented.");
	}
}

