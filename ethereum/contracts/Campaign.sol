// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9; // Tell version of solidity that we used to writing code

contract CampaignFactory {
    address[] deployedCampaigns;

    function createCampaign(uint minimum) public {
        Campaign newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(address(newCampaign));
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint votedCount;
        mapping(address => bool) votedPeople;
    }

    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers; // Mapping of contributor who donated to this campaign
    uint public approversCount;

    uint numRequests; // Index for requests mapping
    mapping(uint => Request) requests; // Like array of Requests

    modifier checkManager() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string memory description, uint value, address payable recipient) public checkManager {
        Request storage newRequest = requests[numRequests++];
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.votedCount = 0;
    }

    function approveRequest(uint index) public {
        Request storage updateRequest = requests[index]; 
        require(approvers[msg.sender]); // Check this account is donated to this campaign
        require(!updateRequest.votedPeople[msg.sender]); // Check this account not voted yet

        updateRequest.votedPeople[msg.sender] = true;
        updateRequest.votedCount++;
    }

    function finalizeRequest(uint index) public checkManager {
        Request storage closeRequest = requests[index];
        require(!closeRequest.complete); // Check this request is not complete
        require(closeRequest.votedCount > (approversCount / 2));

        closeRequest.recipient.transfer(closeRequest.value); // Send money in amount of closeRequest.value to recipient address
        closeRequest.complete = true;
    }
}