import web3 from "./web3";
import Campaign from "../contract_build/Campaign.json";

const instance = (address) =>
  new web3.eth.Contract(Campaign.abi as any, address);

export default instance;
