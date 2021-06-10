// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "./Campaign.sol";

contract Factory {
    Campaign[] deployedContracts;
    
    function createCampaign(uint256 minimum, string memory description) public {
        Campaign newCampaign = new Campaign(
            minimum, 
            description,
            msg.sender
        );
        
        deployedContracts.push(newCampaign);
    }
    
    function getCampaigns() public view returns (Campaign[] memory) {
        return deployedContracts;
    }
}