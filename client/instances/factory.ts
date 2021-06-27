import web3 from "./web3";
import Factory from "../contract_build/Factory.json";
import { FACTORY_ADDRESS } from "../config";

const instance = new web3.eth.Contract(Factory.abi as any, FACTORY_ADDRESS);

export default instance;
