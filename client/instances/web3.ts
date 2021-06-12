import Web3 from "web3";
import secrets from "../secrets";

let web3: Web3;

const initServerProvider = () => {
  const provider = new Web3.providers.HttpProvider(secrets.infuraEndpoint);
  web3 = new Web3(provider);
};

if (process.browser) {
  const Window =
    typeof window === "undefined"
      ? (window as Window & typeof globalThis & { ethereum: any; web3: Web3 })
      : undefined;
  if (!!Window?.web3) web3 = new Web3(Window.web3.givenProvider);
  else initServerProvider();
} else initServerProvider();

export default web3;
