// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "./TollContract.sol";

contract TollContractFactory {

    address[] public deployedTollContracts;

    // Event to log the creation of a new TollContract
    event TollContractCreated(address indexed tollContract, address indexed owner, uint256 initialFee);

    function createTollContract(uint256 _initialFee) public {
        address newTollContract = address(new TollContract(_initialFee));
        deployedTollContracts.push(newTollContract);

        // Emit an event to log the creation of a new TollContract
        emit TollContractCreated(newTollContract, msg.sender, _initialFee);
    }

    function getDeployedTollContracts() public view returns (address[] memory) {
        return deployedTollContracts;
    }
}
