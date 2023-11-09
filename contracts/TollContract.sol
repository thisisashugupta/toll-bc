// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract TollContract {

    uint256 public fee = 500000000000000;
    address public owner;

    constructor(uint256 _fee) {
        owner = msg.sender;
        fee = _fee;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    event FeeSet(address indexed owner, uint256 fee);
    event FeePaid(address indexed payer, uint256 feeAmount);
    event BalanceWithdrawn(address indexed owner, uint256 amount);

    function setFee(uint256 _fee) public onlyOwner {
        require(_fee > 0, "_fee should be greater than zero");
        fee = _fee;
        emit FeeSet(owner, _fee);
    }

    function payFee() public payable {
        require(msg.value == fee, "Incorrect fee amount sent");
        emit FeePaid(msg.sender, msg.value);
    }

    function withdrawBalance() public onlyOwner {
        uint256 balanceToWithdraw = address(this).balance;
        payable(owner).transfer(balanceToWithdraw);
        emit BalanceWithdrawn(owner, balanceToWithdraw);
    }
}
