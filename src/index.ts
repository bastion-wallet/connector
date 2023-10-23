import { BastionCustomConnector, BastionOptions } from "./bastionWallet";
import { Connector, Chain, ConnectorData } from "wagmi";

export class BastionWalletConnector {
	bastionCustomConnector: BastionCustomConnector;

	constructor(config: { chains?: Chain[]; options: BastionOptions }) {
		this.bastionCustomConnector = new BastionCustomConnector(config);
	}
}

 