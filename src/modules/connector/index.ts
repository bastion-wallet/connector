import { Connector, Chain, ConnectorData } from "wagmi";
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
		return new ethers.providers.JsonRpcProvider(this.signerOptions.rpcUrl);
	}

	async connect({ chainId }: { chainId?: number } = {}): Promise<Required<ConnectorData>> {
		let account = "";
		const bastion = new Bastion();
		const bastionConnect = await bastion.bastionConnect;
		const provider = await this.getProvider();
		await bastionConnect.init(provider,this.signerOptions);
		account = await bastionConnect.getAddress();
		this.bastionConnect = bastionConnect;

		return {
			account: account as `0x${string}`,
			chain: {
				id: this.signerOptions.chainId,
				unsupported: false,
			},
		};
	}

	async disconnect() {}

	async getAccount() {
		const account = await this.bastionConnect.getAddress();
		return account;
	}

	async getChainId(): Promise<number> {
		const provider = await this.getProvider();
		const network = await provider.getNetwork();
		const chainId = network.chainId;

		console.log("Chain ID:", chainId);
		return chainId;
	}

	getWalletClient(): any {
		throw new Error("Method not implemented.");
	}
	async isAuthorized(): Promise<boolean> {
		try {
			const account = await this.bastionConnect.getAddress();
			return !!account;
		} catch {
			return false;
		}
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

