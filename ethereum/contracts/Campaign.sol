// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9; // Tell version of solidity that we used to writing code

contract CampaignFactory {
    address[] deployedCampaigns;
    string[] campaignsName;
    uint256[] deadlines;

    function createCampaign(string memory campaignName, uint requiredBalance, uint requiredCost, uint256 deadline, uint min) public returns (address) {
        Campaign newCampaign = new Campaign(msg.sender, campaignName, requiredBalance, requiredCost, deadline, min);
        deployedCampaigns.push(address(newCampaign));
        campaignsName.push(campaignName);
        deadlines.push(deadline);
        return address(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory, string[] memory, uint256[] memory) {
        return (deployedCampaigns, campaignsName, deadlines);
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
        uint minimumContributor;
    }

    Information campaign;

    constructor(address creator, string memory campaignName, uint balance, uint cost, uint256 deadline, uint min) {
        campaign.manager = payable(creator);
        campaign.name = campaignName;
        campaign.requiredBalance = balance;
        campaign.requiredCost = cost;
        campaign.contributorsCount = 0;
        campaign.complete = false;
        campaign.deadline = deadline;
        campaign.minimumContributor = min; 
    }

    function getCampaign() public view returns (address, uint, string memory, uint, uint, uint, bool, uint256, uint) {
        Information storage c = campaign;
        return (c.manager, address(this).balance, c.name, c.requiredBalance, c.requiredCost, c.contributorsCount, c.complete, c.deadline, c.contributors[msg.sender]);
    }

    function contribute() public payable {
        /* 
        ** Case1 : Not require contributor number
        ** Case2 : Required contributor number
        */

        require(!campaign.complete);    
        
        /* Donate session */
        if(campaign.minimumContributor == 0) {
            /* Case1 */
            campaign.contributors[msg.sender] = msg.value;
            campaign.contributorsCount++;
        } else {
            /* Case2 */
            require(msg.value >= campaign.requiredCost);
            campaign.contributors[msg.sender] = msg.value;
            campaign.contributorsCount++;
        }

        /* Transfer session */
        if(address(this).balance >= campaign.requiredBalance) {
            if(campaign.minimumContributor == 0) {
                /* Case1 */
                campaign.manager.transfer(address(this).balance);
                campaign.complete = true;
            } else if(campaign.contributorsCount == campaign.minimumContributor) {
                /* Case2 */
                campaign.manager.transfer(address(this).balance);
                campaign.complete = true;
            }
        }    
    }

    function claim() public payable {
        require(block.timestamp >= campaign.deadline);
        payable(msg.sender).transfer(campaign.contributors[msg.sender]);
    }

    function getIsComplete() public view returns (bool) {
        return campaign.complete;
    }
}