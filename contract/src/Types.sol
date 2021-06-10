// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

library Types {
    struct Request {
        string description;
        uint256 value;
        address payable recipient;
        mapping(address => bool) approvals;
        uint256 approvalCount;
        bool complete;
    }
}