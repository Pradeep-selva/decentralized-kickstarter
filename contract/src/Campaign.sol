// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "./Types.sol";

contract Campaign {
    address manager;
    uint256 minContribution;
    string description;
    Types.Request[] requests;
    mapping(address => bool) approvers;
    uint256 approversCount;
    
    constructor(uint256 minimum, string memory desc) {
        minContribution = minimum;
        description = desc;
        approversCount = 0;
        manager = msg.sender;
    }

    function getSummary() public view 
        returns (
            uint256, 
            uint256, 
            uint256, 
            uint256, 
            string memory
        ) {
        return (
            minContribution,
            requests.length,
            approversCount,
            address(this).balance,
            description
        );
    }
    
    function contribute() public payable validContributor {
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    modifier validContributor() {
        require(msg.value >= minContribution);
        require(!approvers[msg.sender]);
        _;
    }
}