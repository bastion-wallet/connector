import { Connector, Chain, WalletClient } from "wagmi";
import { providers } from "ethers";
import { Bastion } from "bastion-wallet-sdk";
import { Hex, HttpTransport, PublicClient, createPublicClient, createWalletClient, custom, http, Address } from "viem";
import { privateKeyToAccount } from "viem/accounts";

export interface BastionOptions {
	privateKey?: Hex;
	rpcUrl?: string;
	chainId?: number;
	apiKey: string;
	gasToken?: string;
	noSponsorship?: boolean;
	provider?: any;
}

export type ConnectorDataExt ={
	account?: Address;
    chain?: {
        id: number;
        unsupported: boolean;
    };
	bastionSDK : any
}

export class BastionCustomConnector extends Connector {
	readonly id = "bastionWallet";
	readonly name = "Bastion Wallet";
	readonly ready = true;
	signerOptions: BastionOptions;
	bastionSDK: any = {};
	publicClient: PublicClient;
	walletClient: WalletClient;

	constructor(config: any) {
		console.log("BastionCustomConnector constructor");
		super(config);
		this.signerOptions = config.options;
		const chain = this.chains.find((x) => x.id === this.signerOptions.chainId);

		this.publicClient = createPublicClient({
			chain,
			transport: http(this.signerOptions.rpcUrl),
		});

		this.walletClient = this.signerOptions.privateKey
			? createWalletClient({
					account: privateKeyToAccount(
						`0x${this.signerOptions.privateKey}`
					),
					chain,
					transport: http(this.signerOptions.rpcUrl),
				})
			: createWalletClient({
					chain,
					transport: custom(this.signerOptions.provider),
				});
	
	}

	async getProvider() {
		const { chain, transport } = this.publicClient
		const network = {
			chainId: chain.id,
			name: chain.name,
			ensAddress: chain.contracts?.ensRegistry?.address,
		}
		if (transport.type === 'fallback')
			return new providers.FallbackProvider(
			(transport.transports as ReturnType<HttpTransport>[]).map(
				({ value }) => new providers.JsonRpcProvider(value?.url, network),
			),
			)
		return new providers.JsonRpcProvider(transport.url, network)
		// return new ethers.providers.JsonRpcProvider(this.signerOptions.rpcUrl);
	}

	async connect({ chainId }: { chainId?: number } = {}): Promise<Required<ConnectorDataExt>> {
		let account = "";
		const bastion = new Bastion();
		const bastionSDK = await bastion.viemConnect;
		// const provider = await this.getProvider();
		await bastionSDK.init(
			this.publicClient as any,
			this.walletClient as any,
			this.signerOptions
		);
		account = await bastionSDK.getAddress();
		this.bastionSDK = bastionSDK;
		
		return {
			account: account as `0x${string}`,
			chain: {
				id: this.signerOptions.chainId,
				unsupported: false,
			},
			//@ts-ignore
			bastionSDk : this.bastionSDK
		};
	}

	async disconnect() {}

	async getAccount() {
		const account = await this.bastionSDK.getAddress();
		return account;
	}

	async getChainId(): Promise<number> {
		const provider = await this.getProvider();
		const network = await provider.getNetwork();
		const chainId = network.chainId;

		console.log("Chain ID:", chainId);
		return chainId;
	}

	async getChain() {
        const chainId = await this.getChainId()
        const chain = this.chains.find(chain => chain.id === chainId)
        if (!chain) throw new Error(`Please add ${chainId} to chains`)
        return chain
    }

	async getWalletClient(): Promise<any> {
		let provider = await this.getProvider()
		if(!this.walletClient){
			if (!provider) throw new Error('provider is required')
			this.walletClient = createWalletClient({
                account: await this.getAccount(),
                chain: await this.getChain(),
                transport: custom(provider as any)
            })
		}
		this.walletClient.writeContract = this.bastionSDK.writeContract()
		return this.walletClient;
	}

	async isAuthorized(): Promise<boolean> {
		try {
			const account = await this.bastionSDK.getAddress();
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

