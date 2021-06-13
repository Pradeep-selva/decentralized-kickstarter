// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "./Campaign.sol";

contract Factory {
    Campaign[] deployedContracts;
    string[] titles;
    string[] descriptions;
    
    function createCampaign(uint256 minimum, string memory title, string memory description) public {
        Campaign newCampaign = new Campaign(
            minimum, 
            title,
            description,
            msg.sender
        );
        
        deployedContracts.push(newCampaign);
        titles.push(title);
        descriptions.push(description);
    }
    
    function getCampaigns() public view returns (
        Campaign[] memory,
        string[] memory,
        string[] memory
    ) {
        return (
            deployedContracts,
            titles,
            descriptions
        );
    }
}