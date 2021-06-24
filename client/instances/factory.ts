import web3 from "./web3";
import Factory from "../contract_build/Factory.json";

const FACTORY_ADDRESS = "0x7bB08511dE45b13C08DAF8EFa4C0Ba20c4eAa2CC";

const instance = new web3.eth.Contract(Factory.abi as any, FACTORY_ADDRESS);

export default instance;
