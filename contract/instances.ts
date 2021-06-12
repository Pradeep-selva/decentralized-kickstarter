import fs = require("fs-extra");
import path = require("path");

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
