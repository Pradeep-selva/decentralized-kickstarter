import web3 from "./web3";
import secrets from "../../contract/secrets";

const fs = require("fs-extra");
const path = require("path");

const _path = path.resolve("./", "contract_build", "Factory.json");
const { abi } = fs.readJSONSync(_path);

const instance = new web3.eth.Contract(abi, secrets.deployedAddress);

export default instance;
