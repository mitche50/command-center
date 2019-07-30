import { RenNetworkDetails } from "@renproject/contracts";
import Web3 from "web3";

import { createWeb3, Provider } from "../../../test/globalSetup";
import { darknodeIDBase58ToHex } from "../../components/pages/Darknode";
import { getDarknodeStatus, RegistrationStatus } from "./network";

let web3: Web3, network: RenNetworkDetails, provider: Provider;
beforeAll(async () => { ({ web3, network, provider } = await createWeb3()); });
afterAll(() => { provider.engine.stop(); });

test("getDarknodeStatus", async () => {
    const darknodeID = darknodeIDBase58ToHex("8MJpA1rXYMPTeJoYjsFBHJcuYBe7zP");
    (await getDarknodeStatus(web3, network, darknodeID))
        .should.equal(RegistrationStatus.Unregistered);
});
