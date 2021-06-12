import web3 from "./web3";
import secrets from "../../contract/secrets";
import Factory from "../contract_build/Factory.json";

const instance = new web3.eth.Contract(
  Factory.abi as any,
  secrets.deployedAddress
);

export default instance;
