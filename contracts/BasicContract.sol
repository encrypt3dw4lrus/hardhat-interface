// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "./interfaces/IBasic.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

contract BasicContract is IBasic, ERC165 {

    uint256 value = 0;
    uint256 valueTwo = 0;

    uint256 storeNumber = 0;

    mapping(string => string) public keyValueMap;

    function addTwoValues(uint256 v, uint256 v2) public {
        value = v;
        valueTwo = v2;
        storeNumber = value + valueTwo;
    }

    function saveStructToMap(keyValues memory params) public {
        keyValueMap[params.key] = params.value;    
    }

    function getInterface() public pure returns(bytes4) {
        return type(IBasic).interfaceId;
    }

    function getNumber() public pure returns(uint256){
        uint256 number = 5;
        return (number);
    }
    function getString() public pure returns(string memory){
        return ("someString");
    }
}