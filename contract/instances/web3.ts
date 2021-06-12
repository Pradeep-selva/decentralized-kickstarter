import Web3 from "web3";
import secrets from "../secrets";

let web3: Web3 | undefined;

const Window = window as Window &
  typeof globalThis & { ethereum: any; web3: Web3 };

if (!!Window?.web3) {
  web3 = new Web3(Window.web3.givenProvider);
} else {
  const provider = new Web3.providers.HttpProvider(secrets.infuraEndpoint);
  web3 = new Web3(provider);
}

export default web3;
