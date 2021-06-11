import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";
import secrets from "../secrets";
import GetAttrs from "../instances";

const provider = new HDWalletProvider(secrets.mnemonic, secrets.infuraEndpoint);
const { eth } = new Web3(provider);

const { ByteCode, abi } = GetAttrs("Factory");

(async () => {
  const accounts = await eth.getAccounts();
  console.log("\nAttempting to deploy from -", accounts[0]);

  console.log("ABI -", JSON.stringify(abi));

  const {
    options: { address }
  } = await new eth.Contract(abi)
    .deploy({ data: `0x${ByteCode}` })
    .send({ from: accounts[0] });

  console.log("\nDeployed to -", address);
  provider.engine.stop();
})();
