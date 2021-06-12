import path = require("path");
import fs = require("fs-extra");
import solc from "solc";

const buildPaths = [
  path.resolve(__dirname, "../", "../", "build"),
  path.resolve(__dirname, "../", "../", "../", "client", "contract_build")
];
const contractFiles = ["Campaign.sol", "Factory.sol", "Types.sol"];

buildPaths.forEach((buildPath) => fs.removeSync(buildPath));

const contractConfig = contractFiles.map((contract) => {
  const _path = path.resolve(__dirname, "../", "src", contract);

  return {
    fileName: contract,
    content: fs.readFileSync(_path, "utf-8")
  };
});

const input = {
  language: "Solidity",
  sources: {},
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"]
      }
    }
  }
};

contractConfig.forEach(({ fileName, content }) => {
  (input.sources as any)[fileName] = {
    content
  };
});

const output = JSON.parse(solc.compile(JSON.stringify(input)));

buildPaths.forEach((buildPath) => fs.ensureDirSync(buildPath));

Object.keys(output?.contracts).forEach((contractName) => {
  const contract = contractName.split(".")[0];

  buildPaths.forEach((buildPath) =>
    fs.outputJSONSync(
      path.resolve(buildPath, `${contract}.json`),
      output.contracts?.[contractName][contract]
    )
  );
});
