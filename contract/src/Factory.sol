// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "./Campaign.sol";

contract Factory {
    Campaign[] deployedContracts;
    string[] titles;
    string[] descriptions;
    string[] images;
    
    function createCampaign(
        uint256 minimum, 
        string memory title, 
        string memory description, 
        string memory image
    ) public {
        Campaign newCampaign = new Campaign(
            minimum, 
            title,
            description,
            image,
            msg.sender
        );
        
        deployedContracts.push(newCampaign);
        titles.push(title);
        descriptions.push(description);
        images.push(image);
    }
    
    function getCampaigns() public view returns (
        Campaign[] memory,
        string[] memory,
        string[] memory,
        string[] memory
    ) {
        return (
            deployedContracts,
            titles,
            descriptions,
            images
        );
    }
}