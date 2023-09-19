import { BastionCustomConnector, BastionSignerOptions } from "./modules/connector";
import { Connector, Chain, ConnectorData } from "wagmi";

export class BastionWalletConnector {
	bastionCustomConnector: BastionCustomConnector;

	constructor(config: { chains?: Chain[]; options: BastionSignerOptions }) {
		this.bastionCustomConnector = new BastionCustomConnector(config);
	}
}

