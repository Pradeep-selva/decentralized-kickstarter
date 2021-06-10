// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "./Types.sol";

contract Campaign {
    address manager;
    uint256 minContribution;
    string description;
    Types.Request requests;
    mapping(address => bool) approvers;
    uint256 approversCount;
    
    constructor(uint256 minimum, string memory desc) {
        minContribution = minimum;
        description = desc;
        approversCount = 0;
        manager = msg.sender;
    }
}