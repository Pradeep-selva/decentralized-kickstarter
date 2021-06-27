import web3 from "./web3";
import Factory from "../contract_build/Factory.json";
import { FACTORY_ADDRESS } from "../config";

const instance = new web3.eth.Contract(Factory.abi as any, FACTORY_ADDRESS);

export default instance;
// 0x7bb08511de45b13c08daf8efa4c0ba20c4eaa2cc;
