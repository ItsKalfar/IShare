// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";

error NotOwner();
error NotSigned();
error NotRequestedYet();
error NotValidInput();
error SamePerson();
error AlreadySigned();
error AlreadyRequested();
error NotVerifier();

contract IShare {
    using Counters for Counters.Counter;
    Counters.Counter public _userID;

    struct UserCredentials {
        uint256 userNo;
        address userId;
        string userName;
        string userLocation;
        uint256 userAge;
        bool userSigned;
        bool isseuerSigned;
        address issuerId;
        uint256 issueDate;
    }

    mapping(uint256 => UserCredentials) public s_Users;
    mapping(address => UserCredentials) public s_allUsers;
    mapping(address => bool) public s_permittedVerfier;

    event RequestSent();
    event CredentialsIssued();
    event CredentialsAcepted();
    event GiveConcent();
    event ConcentRevoked();

    function requestCredentials(
        string memory _name,
        string memory _location,
        uint256 _age
    ) external {
        if (s_allUsers[msg.sender].userId == msg.sender) {
            revert AlreadyRequested();
        }
        if (_age <= 0) {
            revert NotValidInput();
        }
        _userID.increment();
        uint256 currentId = _userID.current();
        s_allUsers[msg.sender] = UserCredentials(
            currentId,
            msg.sender,
            _name,
            _location,
            _age,
            false,
            false,
            address(0),
            block.timestamp
        );
        s_Users[currentId] = UserCredentials(
            currentId,
            msg.sender,
            _name,
            _location,
            _age,
            false,
            false,
            address(0),
            block.timestamp
        );
        emit RequestSent();
    }

    function issueCredentials(address userId, uint256 userNo) external {
        if (s_allUsers[userId].userAge <= 0) {
            revert NotRequestedYet();
        }
        if (s_allUsers[userId].userId == msg.sender) {
            revert SamePerson();
        }
        if (s_allUsers[userId].isseuerSigned == true) {
            revert AlreadySigned();
        }
        s_allUsers[userId].issuerId = msg.sender;
        s_allUsers[userId].isseuerSigned = true;
        s_Users[userNo].issuerId = msg.sender;
        s_Users[userNo].isseuerSigned = true;
        emit CredentialsIssued();
    }

    function acceptCredentials(address userId, uint256 userNo) external {
        if (s_allUsers[userId].userAge <= 0) {
            revert NotRequestedYet();
        }
        if (s_allUsers[userId].userId != msg.sender) {
            revert NotOwner();
        }
        if (s_allUsers[userId].isseuerSigned == false) {
            revert NotSigned();
        }
        s_allUsers[userId].userSigned = true;
        s_allUsers[userId].issueDate = block.timestamp;
        s_Users[userNo].userSigned = true;
        s_Users[userNo].issueDate = block.timestamp;
        emit CredentialsAcepted();
    }

    function giveConcent(address userId, address recipientId) external {
        if (s_allUsers[userId].userId != msg.sender) {
            revert NotOwner();
        }
        if (s_allUsers[userId].isseuerSigned == false) {
            revert NotSigned();
        }

        s_permittedVerfier[recipientId] = true;
        emit GiveConcent();
    }

    function revokeConcent(address userId, address recipientId) external {
        if (s_allUsers[userId].userId != msg.sender) {
            revert NotOwner();
        }
        if (s_allUsers[userId].isseuerSigned == false) {
            revert NotSigned();
        }
        s_permittedVerfier[recipientId] = false;
        emit ConcentRevoked();
    }

    function checkConcent(
        address userId,
        address recipientId
    ) public view returns (bool) {
        if (s_allUsers[userId].userId != msg.sender) {
            revert NotOwner();
        }
        if (s_allUsers[userId].isseuerSigned == false) {
            revert NotSigned();
        }
        if (s_permittedVerfier[recipientId] == true) {
            return true;
        }
        return false;
    }

    function verifyUser(
        address userId,
        address recipientId
    ) public view returns (bool) {
        if (recipientId != msg.sender) {
            revert NotVerifier();
        }
        if (s_allUsers[userId].isseuerSigned == false) {
            revert NotSigned();
        }

        if (s_permittedVerfier[recipientId] == true) {
            return true;
        }
        return false;
    }
}
