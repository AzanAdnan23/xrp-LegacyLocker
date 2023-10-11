// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

contract Switch {
    uint lastAction;
    address recipient;
    address owner;

    constructor(address _recipient) payable {
        recipient = _recipient;
        owner = msg.sender;
        lastAction = block.timestamp;
    }

    function withdraw() external {
        require((block.timestamp - lastAction) >= 52 weeks);
        (bool success, ) = recipient.call{ value: address(this).balance }("");
        require(success);
    }

    function ping() external {
        require(owner == msg.sender);
        lastAction = block.timestamp;
    }
}