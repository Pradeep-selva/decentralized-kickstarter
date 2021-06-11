import fs = require("fs-extra");
import path = require("path");
import Web3 from "web3";

export default (
  type: "Campaign" | "Factory",
  web3: Web3,
  address: string | undefined
) => {
  const _path = path.resolve("./", "build", `${type}.json`);
  const { abi } = fs.readJSONSync(_path);

  return !!address
    ? new web3.eth.Contract(abi, address)
    : new web3.eth.Contract(abi);
};
