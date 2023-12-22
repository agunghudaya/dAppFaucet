// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;

contract Storage {

    uint8 public a  = 7;    // 1 byte
    uint16 public b = 10;   // 2 bytes
    address public c = 0x0E9cd12C7AB142b98079C4E4e969426cFbbbE9Fe; // 8 bytes
    bool d = true;          // 1 byte
    uint64 public e = 15;   // 8 bytes
    // all above 32 bytes -> slot 0

    uint256 public f = 200; // 32 bytes -> slot 1
    uint8 public g = 40;    // 1 byte   -> slot 2
    uint256 public h = 789; // 32 bytes -> slot 3

}