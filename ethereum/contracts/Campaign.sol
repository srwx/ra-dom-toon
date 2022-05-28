// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9; // Tell version of solidity that we used to writing code

contract CampaignFactory {
    address[] deployedCampaigns;
    string[] campaignsName;

    function createCampaign(string memory campaignName, uint requiredBalance, uint requiredCost, uint256 deadline) public returns (address) {
        Campaign newCampaign = new Campaign(msg.sender, campaignName, requiredBalance, requiredCost, deadline);
        deployedCampaigns.push(address(newCampaign));
        campaignsName.push(campaignName);
        return address(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory, string[] memory) {
        return (deployedCampaigns, campaignsName);
    }
}

contract Campaign {
    struct Information {
        address payable manager;
        string name;
        uint requiredBalance;
        uint requiredCost;
        mapping(address => uint) contributors; // Mapping of contributor who donated to this campaign
        uint contributorsCount;
        bool complete;
        uint256 deadline;
    }

    Information campaign;

    constructor(address creator, string memory campaignName, uint balance, uint cost, uint256 deadline) {
        campaign.manager = payable(creator);
        campaign.name = campaignName;
        campaign.requiredBalance = balance;
        campaign.requiredCost = cost;
        campaign.contributorsCount = 0;
        campaign.complete = false;
        campaign.deadline = deadline;
    }

    function getCampaign() public view returns (address, uint, string memory, uint, uint, uint, bool, uint256) {
        Information storage c = campaign;
        return (c.manager, address(this).balance, c.name, c.requiredBalance, c.requiredCost, c.contributorsCount, c.complete, c.deadline);
    }

    function contribute(uint donate) public payable {
        require(!campaign.complete);
        
        if(campaign.requiredCost == 0) {
            campaign.contributors[msg.sender] = donate;
            campaign.contributorsCount++;
        } else {
            require(msg.value >= campaign.requiredCost);
            campaign.contributors[msg.sender] = donate;
            campaign.contributorsCount++;
        }

        if(address(this).balance >= campaign.requiredBalance) {
            campaign.manager.transfer(address(this).balance);
            campaign.complete = true;
        }
    }

    function getContributorDonate() public view returns (uint) {
        return campaign.contributors[msg.sender];
    }

    function claim() public payable {
        require(block.timestamp >= campaign.deadline);
        payable(msg.sender).transfer(campaign.contributors[msg.sender]);
    }
}