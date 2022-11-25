// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

interface IBasic {
    
    struct keyValues{
        string key;
        string value;
    }
    function addTwoValues(uint256 v, uint256 v2) external;
    function saveStructToMap(keyValues memory keysValues) external;
    function getNumber() external returns(uint256);
    function getString() external returns(string memory);
}