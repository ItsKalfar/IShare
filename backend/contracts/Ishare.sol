// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";

error NotOwner();
error NotSigned();
error NotRequestedYet();
error NotValidInput();
error SamePerson();
error AlreadySigned();
error NotVerifier();

contract IShare {
    using Counters for Counters.Counter;
    Counters.Counter public _userID;
    Counters.Counter public _requestedID;

    struct UserCredentials {
        uint256 userId;
        address userAddress;
        string userName;
        string userLocation;
        uint256 userAge;
        bool userSigned;
        bool isseuerSigned;
        address issuerId;
        uint256 issueDate;
    }

    mapping(uint256 => UserCredentials) public s_allUsers;
    mapping(uint256 => address) public s_requestedVerifier;
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
        if (_age <= 0) {
            revert NotValidInput();
        }
        _userID.increment();
        uint256 currentId = _userID.current();
        s_allUsers[currentId] = UserCredentials(
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

    function issueCredentials(uint256 _userId) external {
        if (s_allUsers[_userId].userAge <= 0) {
            revert NotRequestedYet();
        }
        if (s_allUsers[_userId].userAddress == msg.sender) {
            revert SamePerson();
        }
        if (s_allUsers[_userId].isseuerSigned == true) {
            revert AlreadySigned();
        }
        s_allUsers[_userId].issuerId = msg.sender;
        s_allUsers[_userId].isseuerSigned = true;
        emit CredentialsIssued();
    }

    function dismissRequest(uint256 _userId) external {
        if (s_allUsers[_userId].userAge <= 0) {
            revert NotRequestedYet();
        }
        if (s_allUsers[_userId].userAddress == msg.sender) {
            revert SamePerson();
        }
        if (s_allUsers[_userId].isseuerSigned == true) {
            revert AlreadySigned();
        }

        delete s_allUsers[_userId];
    }

    function acceptCredentials(uint256 _userId) external {
        if (s_allUsers[_userId].userAge <= 0) {
            revert NotRequestedYet();
        }
        if (s_allUsers[_userId].userAddress != msg.sender) {
            revert NotOwner();
        }
        if (s_allUsers[_userId].isseuerSigned == false) {
            revert NotSigned();
        }
        s_allUsers[_userId].userSigned = true;
        s_allUsers[_userId].issueDate = block.timestamp;
        emit CredentialsAcepted();
    }

    function requestConcent() external {
        _requestedID.increment();
        uint256 currentId = _requestedID.current();
        s_requestedVerifier[currentId] = msg.sender;
    }

    function giveConcent(
        uint256 _userId,
        uint256 _recipientId,
        address recipientId
    ) external {
        if (s_allUsers[_userId].userAddress != msg.sender) {
            revert NotOwner();
        }
        if (s_allUsers[_userId].isseuerSigned == false) {
            revert NotSigned();
        }
        if (s_requestedVerifier[_recipientId] != recipientId) {
            revert NotRequestedYet();
        }

        s_permittedVerfier[recipientId] = true;
        emit GiveConcent();
    }

    function revokeConcent(uint256 _userId, address recipientId) external {
        if (s_allUsers[_userId].userAddress != msg.sender) {
            revert NotOwner();
        }
        if (s_allUsers[_userId].isseuerSigned == false) {
            revert NotSigned();
        }
        s_permittedVerfier[recipientId] = false;
        emit ConcentRevoked();
    }

    function checkConcent(uint256 _userId) public view returns (bool) {
        if (s_allUsers[_userId].isseuerSigned == false) {
            revert NotSigned();
        }
        if (s_permittedVerfier[msg.sender] == true) {
            return true;
        }

        return false;
    }

    function verifyUser(uint256 _userId) public view returns (bool) {
        if (s_allUsers[_userId].isseuerSigned == false) {
            revert NotSigned();
        }
        if (s_allUsers[_userId].userAddress == msg.sender) {
            revert SamePerson();
        }

        if (s_permittedVerfier[msg.sender] != true) {
            revert NotVerifier();
        }
        for (uint i = 18; i <= 50; i++) {
            if (
                keccak256(abi.encode(s_allUsers[_userId].userAge)) ==
                keccak256(abi.encode(i))
            ) {
                return true;
            }
        }
        return false;
    }

    function getCurrentUserId() external view returns (uint256) {
        return _userID.current();
    }

    function getCurrentrecipientId() external view returns (uint256) {
        return _requestedID.current();
    }

    function getUsers(
        uint256 _userCurrentId
    ) external view returns (UserCredentials memory) {
        return s_allUsers[_userCurrentId];
    }

    function getPermittedVerifier(
        address _verifierAddress
    ) external view returns (bool) {
        return s_permittedVerfier[_verifierAddress];
    }

    function requestedAccounts(
        uint256 _userId
    ) external view returns (address) {
        return s_requestedVerifier[_userId];
    }
}
