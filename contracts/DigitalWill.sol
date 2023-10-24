// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

// TODO: add share functionality means if there are more then 1 recipient

contract DigitalWill {
    struct UserInfo {
        address user;
        address recipient;
        uint lastAction;
        uint256 balance;
    }
    mapping(address => UserInfo) public users;

    event UserAdded(
        address indexed user,
        address indexed recipient,
        uint256 balance
    );
    event UserRemoved(address indexed user);
    event Withdrawn(
        address indexed parent,
        address indexed recipient,
        uint256 balance
    );
    event RevertedToOwner(address indexed user, uint256 balance);
    event Pinged(address indexed user);

    function adduser(address _recipient) external payable {
        require(msg.value > 0, "You must send some Ether to deposit.");
        require(users[msg.sender].user == address(0), "User already exists");

        users[msg.sender] = UserInfo({
            user: msg.sender,
            recipient: _recipient,
            lastAction: block.timestamp,
            balance: msg.value
        });
        emit UserAdded(msg.sender, _recipient, msg.value);
    }

    function withdraw(address parent) external {
        require(users[parent].user != address(0), "User does not exist");

        require(
            users[parent].user == parent &&
                users[parent].recipient == msg.sender,
            "Invalid user or recipient"
        );

        require(
            (block.timestamp - users[parent].lastAction) >= 52 weeks,
            "Withdrawal not allowed yet"
        );

        (bool success, ) = users[parent].recipient.call{
            value: users[parent].balance
        }("");
        require(success, "Transfer to recipient failed");

        emit Withdrawn(parent, users[parent].recipient, users[parent].balance);

        users[parent].balance = 0;

        removeUser(parent);
    }

    // add revert transection means it will transfer the amount back to the wallet.
    function revertToOwner() external {
        require(
            msg.sender == users[msg.sender].user,
            "Only owner can call this function"
        );

        (bool success, ) = users[msg.sender].user.call{
            value: users[msg.sender].balance
        }("");

        require(success, "Transfer to recipient failed");

        emit RevertedToOwner(msg.sender, users[msg.sender].balance);

        users[msg.sender].balance = 0;

        removeUser(msg.sender);
    }

    function ping() external {
        require(
            msg.sender == users[msg.sender].user,
            "Only the user can call this function"
        );
        users[msg.sender].lastAction = block.timestamp;
        emit Pinged(msg.sender);
    }

    // View function to return user info
    function getUserInfo(address _user) public view returns (UserInfo memory) {
        return users[_user];
    }

    function removeUser(address userAddress) internal {
        require(
            users[userAddress].balance == 0,
            " User can't be remvoed Because User has not withdrawn yet"
        );

        emit UserRemoved(userAddress);

        users[userAddress] = UserInfo(address(0), address(0), 0, 0);
    }
}
