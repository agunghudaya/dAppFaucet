// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;

contract Faucet {
    receive() external payable {}


    address[] private funders;

    function addFunds() external payable {
        funders.push(msg.sender);
    }

    function getFunders() public view returns (address[] memory) {
        return funders;
    }

    function getFunderAtIndex(uint8 index) external view returns(address) {
        address[] memory _funders = getFunders();
        return _funders[index];

    }
}

