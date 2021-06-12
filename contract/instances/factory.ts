import GetAttrs, { web3 } from ".";
import secrets from "../secrets";

const { abi } = GetAttrs("Factory");

const instance = new web3.eth.Contract(abi, secrets.deployedAddress);

export default instance;
