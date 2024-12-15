// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Funder {
    uint public numOfFunders;
    mapping(uint => address) private funders;

    function transfer() external payable {
        funders[numOfFunders] = msg.sender;
    }

    receive() external payable {}
    
    function withdraw(uint withdrawAmount) external {
        require(
            withdrawAmount <= 2000000000000000000,
            "Cannout withdraw more than 2 ether"
        );
        payable(msg.sender).transfer(withdrawAmount);
    }
}
