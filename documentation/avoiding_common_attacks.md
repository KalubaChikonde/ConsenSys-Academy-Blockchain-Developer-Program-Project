# Afrobeats Song Registry Design Patterns

The following document outlines the project design patterns implemented in the SongRegistry smart contract. 

## 1. Restricting Access

In the `SongRegistry` contract, there are certain functions which are restricted only to the admin/owner. This design pattern helps us to achieve this using the ethpm package, *OpenZeppelin*. The `Ownable` module in this package is used through inheritance. It will make available the modifier `onlyOwner`, which can be applied to your functions to restrict their use to the owner. 
The `kill` function is restricted yo the owner in the smart contract `SongRegistry`.

```
import "@openzeppelin/contracts/ownership/Ownable.sol";
contract SongRegistry is Ownable {
....
....
....
function kill() public onlyOwner onlyInEmergency {
        if(msg.sender == owner()) selfdestruct(address(uint160(owner()))); // cast owner to address payable
      }

}

```


## 2. Fail Early and Fail Loud

The `require` keyword is used throughout the contract to checck as early as possible whether certain condistions are met. This helps reduce unnecessary code execution. 

```
    function registerSong(string memory _title,uint _price) public {
        //check if title is valid
        require(bytes(_title).length > 0, "Invalid song title.");
        //check if the price is valid
        require(_price > 0, "Invalid song price.");
        //increase song count
        ....
        ....
        ....
        ....
    }
```


## 3. Circuit Breaker

## 4. Mortal
