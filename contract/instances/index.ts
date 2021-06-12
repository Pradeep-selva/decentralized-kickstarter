import fs = require("fs-extra");
import path = require("path");
import Web3 from "web3";

export default (type: "Campaign" | "Factory") => {
  const _path = path.resolve("./", "build", `${type}.json`);
  const {
    abi,
    evm: {
      bytecode: { object: ByteCode }
    }
  } = fs.readJSONSync(_path);

  return { abi, ByteCode };
};

export { default as web3 } from "./web3";
export { default as Factory } from "./factory";
