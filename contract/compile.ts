import path = require("path");
import solc from "solc";
import fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
const contractFiles = ["Campaign.sol", "Factory.sol"];

const contractConfig = contractFiles.map((contract) => {
  const _path = path.resolve(__dirname, "src", contract);

  return {
    fileName: contract,
    source: fs.readFileSync(_path, "utf-8")
  };
});

console.log(contractConfig);
