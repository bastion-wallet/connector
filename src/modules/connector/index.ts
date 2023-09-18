import { Connector, Chain, ConnectorData } from "wagmi";
import { Provider } from "@ethersproject/providers";
import { Bastion } from "bastion-wallet-sdk";

export interface BastionSignerOptions {
	privateKey?: string;
	rpcUrl?: string;
	chainId?: number;
	apiKey: string;
	gasToken?: string;
	noSponsorship?: boolean;
	provider?: Provider;
	middleware?: "ethers" | "viem";
}

export class BastionCustomConnector extends Connector {
	readonly id = "bastionWallet";
	readonly name = "Bastion Wallet";
	readonly ready = true;
	provider = null;
	apiKey = "";
	chainId = null;
	bastionConnect: any = {};

	constructor(config: { chains?: Chain[]; options: BastionSignerOptions }) {
		super(config);
		config.options.provider = this.provider;
		config.options.apiKey = this.apiKey;
		config.options.chainId = this.chainId;
	}

	async getProvider() {
		if (this.provider) throw new Error("Provider not found");
		return this.provider;
	}

	async connect({ chainId }: { chainId?: number } = {}): Promise<Required<ConnectorData>> {
		let account = "";
		const bastion = new Bastion();
		const bastionConnect = await bastion.bastionConnect;
		if (this.provider) {
			//   await bastionConnect.connect(this.provider);
			await bastionConnect.init(this.provider, {
				chainId: this.chainId,
				apiKey: this.apiKey,
			});
			account = await bastionConnect.getAddress();
			this.bastionConnect = bastionConnect;
		}
		return {
			account: account as `0x${string}`,
			chain: {
				id: 80001,
				unsupported: false,
			},
		};
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

