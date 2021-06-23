// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "./Types.sol";

contract Campaign {
    address manager;
    uint256 minContribution;
    string description;
    string title;
    string image;
    mapping(uint256 => Types.Request) public requests;
    uint256 numRequests;
    mapping(address => bool) approvers;
    uint256 public approversCount;
    uint256 cindex;
    
    constructor(
        uint256 minimum, 
        string memory _title, 
        string memory desc, 
        string memory _image, 
        address sender,
        uint256 _index
    ) {
        minContribution = minimum;
        title = _title;
        description = desc;
        image = _image;
        approversCount = 0;
        numRequests = 0;
        manager = sender;
        cindex = _index;
    }
    
    function getSummary() public view returns (
        uint256, uint256, uint256, uint256, 
        string memory, string memory, string memory, 
        address,
        uint256
    ) {
        return (
            minContribution,
            numRequests,
            approversCount,
            address(this).balance,
            title,
            description,
            image,
            manager,
            cindex
        );
    }

    function getRequestCount() public view returns (uint256) {
        return numRequests;
    }

    
    function contribute() public payable newContributor {
        approvers[msg.sender] = true;
        approversCount++;
    }

    function isContributor(address user) public view returns (bool) {
        return approvers[user]; 
    }

    function edit(
        string memory _title, 
        string memory _description, 
        string memory _image,
        address sender
    ) public {
        require(sender == manager);
        
        title = _title;
        description = _description;
        image = _image;
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
    
    function approveRequest(uint256 index) public contributor {
        Types.Request storage req = requests[index];
        
        require(!req.approvals[msg.sender]);
        
        req.approvals[msg.sender] = true;
        req.approvalCount++;
    }
    
    function finalizeRequest(uint256 index) public owner {
        Types.Request storage req = requests[index];
        
        require(req.approvalCount >= approversCount/2);
        require(!req.complete);
        
        req.recipient.transfer(req.value);
        req.complete = true;
    }
    
    modifier owner() {
        require(msg.sender == manager);
        _;
    }
    
    modifier newContributor() {
        require(msg.value >= minContribution);
        require(!approvers[msg.sender]);
        _;
    }
    
    modifier contributor() {
        require(approvers[msg.sender]);
        _;
    }
}