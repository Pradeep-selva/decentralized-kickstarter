import assert from "assert";
import ganache from "ganache-cli";
import { describe } from "mocha";
import GetInstance from "../instances";
import Web3 from "web3";

const web3 = new Web3(ganache.provider());

describe("tests", () => {
  it("check", () => assert(true));
});
