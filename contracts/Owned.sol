pragma solidity >=0.5.0 < 0.6.0;


contract Owned {
  // State variables
  address owner;

  //modifiers
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  // constructor
  constructor() public {
    owner = msg.sender;
  }
}