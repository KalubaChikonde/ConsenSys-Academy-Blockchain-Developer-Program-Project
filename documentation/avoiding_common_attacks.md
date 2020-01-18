# Afrobeats Song Registry Design Patterns

The following document outlines the project design patterns implemented in the SongRegistry smart contract. 

## 1. Restricting Access

In the `SongRegistry` contract, there are certain functions which are restricted only to the admin/owner. This design pattern helps us to achieve this using the ethpm package, *OpenZeppelin*. This module is used through inheritance. It will make available the modifier `onlyOwner`, which can be applied to your functions to restrict their use to the owner. 
The `kill` function is restricted yo the owner in the smart contract `SongRegistry`.

```
import "@openzeppelin/contracts/ownership/Ownable.sol";
contract SongRegistry is Ownable {
....

function kill() public onlyOwner onlyInEmergency {
        if(msg.sender == owner()) selfdestruct(address(uint160(owner()))); // cast owner to address payable
      }

}

```


## 2. Fail Early and Fail Loud

## 3. Circuit Breaker

## 4. Mortal
