// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "./Types.sol";

contract Campaign {
    address manager;
    uint256 minContribution;
    string description;
    mapping(uint256 => Types.Request) requests;
    uint256 numRequests;
    mapping(address => bool) approvers;
    uint256 approversCount;
    
    constructor(uint256 minimum, string memory desc) {
        minContribution = minimum;
        description = desc;
        approversCount = 0;
        numRequests = 0;
        manager = msg.sender;
    }
    
    function getSummary() public view returns (uint256, uint256, uint256, uint256, string memory) {
        return (
            minContribution,
            numRequests,
            approversCount,
            address(this).balance,
            description
            );
    }
    
    function contribute() public payable validContributor {
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(
        string memory desc,
        address payable recipient,
        uint256 value
    ) public  owner {
        Types.Request storage req = requests[numRequests++];
        
        req.description = desc;
        req.recipient = recipient;
        req.value = value;
        req.approvalCount = 0;
        req.complete = false;
    }
    
    modifier validContributor() {
        require(msg.value >= minContribution);
        require(!approvers[msg.sender]);
        _;
    }
    
    modifier owner() {
        require(msg.sender == manager);
        _;
    }
}