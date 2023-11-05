// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract DigitalWill {
    struct UserInfo {
        address user;
        address[] recipients;
        uint lastAction;
        uint256 balance;
        uint customTime;
    }
    mapping(address => UserInfo) public users;
    mapping(address => uint256) public recipientBalances; // Mapping to store recipient balances

    event UserAdded(
        address indexed user,
        address[] indexed recipients,
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

    function adduser(
        address[] memory _recipients,
        uint _customTime
    ) external payable {
        require(msg.value > 0, "You must send some Ether to deposit.");
        require(msg.sender != address(0), "Cannot add zero address");
        require(users[msg.sender].user == address(0), "User already exists");

        users[msg.sender] = UserInfo({
            user: msg.sender,
            recipients: _recipients,
            lastAction: block.timestamp,
            balance: msg.value,
            customTime: _customTime
        });

        uint256 recipientShare;
        if (_recipients.length == 1) {
            recipientShare = msg.value; // If there's only one recipient, assign the entire balance
        } else {
            recipientShare = msg.value / _recipients.length; // Otherwise, distribute equally among all recipients
        }

        for (uint i = 0; i < _recipients.length; i++) {
            recipientBalances[_recipients[i]] = recipientShare; // Update the recipient's balance in the mapping
        }

        emit UserAdded(msg.sender, _recipients, msg.value);
    }

    function withdraw(address parent) external {
        require(users[parent].user != address(0), "User does not exist");

        require(isRecipient(parent, msg.sender), "Invalid recipient");

        // Use the user's custom time period here
        require(
            (block.timestamp - users[parent].lastAction) >=
                users[parent].customTime,
            "Withdrawal not allowed yet"
        );

        uint256 recipientShare = recipientBalances[msg.sender]; // Get the recipient's share from the mapping

        require(recipientShare > 0, "Recipient has no balance");

        (bool success, ) = msg.sender.call{value: recipientShare}("");
        require(success, "Transfer to recipient failed");

        emit Withdrawn(parent, msg.sender, recipientShare);

        users[parent].balance -= recipientShare;

        recipientBalances[msg.sender] = 0; // Set the recipient's balance in the mapping to 0 after withdrawal

        if (users[parent].balance == 0) {
            removeUser(parent);
        }
    }

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

    function getRecipientBalance(
        address _recipient
    ) public view returns (uint256) {
        return recipientBalances[_recipient];
    }

    function isRecipient(
        address _user,
        address _recipient
    ) internal view returns (bool) {
        for (uint i = 0; i < users[_user].recipients.length; i++) {
            if (users[_user].recipients[i] == _recipient) {
                return true;
            }
        }
        return false;
    }

    function isRecipientE(
        address _user,
        address _recipient
    ) external view returns (bool) {
        for (uint i = 0; i < users[_user].recipients.length; i++) {
            if (users[_user].recipients[i] == _recipient) {
                return true;
            }
        }
        return false;
    }

    function isUser(address _user) public view returns (bool) {
        return users[_user].user == _user;
    }

    function removeUser(address userAddress) internal {
        require(
            users[userAddress].balance == 0,
            " User can't be removed because user has not withdrawn yet"
        );

        emit UserRemoved(userAddress);

        delete users[userAddress];
    }
}
