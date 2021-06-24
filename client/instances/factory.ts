import web3 from "./web3";
import Factory from "../contract_build/Factory.json";

const instance = new web3.eth.Contract(
  Factory.abi as any,
  process.env.REACT_APP_DEPLOYED_ADDRESS
);

export default instance;
