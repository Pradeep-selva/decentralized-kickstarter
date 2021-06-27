import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";
import secrets from "../secrets";
import GetAttrs from "../instances";

import fs = require("fs-extra");
import path = require("path");

const provider = new HDWalletProvider(secrets.mnemonic, secrets.infuraEndpoint);
const { eth } = new Web3(provider);

const { ByteCode, abi } = GetAttrs("Factory");

const getAddressFileString = (address: string) => `export default "${address}"`;

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

  const addressPath = path.resolve(
    __dirname,
    "../",
    "../",
    "../",
    "client",
    "config",
    "address.ts"
  );

  fs.writeFileSync(addressPath, getAddressFileString(address));

  provider.engine.stop();
})();
