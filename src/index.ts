import { BastionCustomConnector } from "./modules/connector";

export class BastionWalletConnector {
	bastionCustomConnector: BastionCustomConnector;

	constructor(config: any) {
		this.bastionCustomConnector = new BastionCustomConnector(config);
	}
}

