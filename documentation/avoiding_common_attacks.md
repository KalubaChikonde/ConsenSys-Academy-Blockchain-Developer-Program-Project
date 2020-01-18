# Afrobeats Song Registry Security Tools

The following document outlines the project security tools implemented in the SongRegistry smart contract to ensure that the contract is not susceptible to common attacks . 

## 1. MythX (Remix extension)



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


## 2. TxOrigin Attack

We use the global variable `msg.sender` instead of `tx.origin` for authorization. This is because `msg.sender` references the address of the sender of the current call while `tx.origin` references the address of the original sender of the transaction which may be the attack wallet. 



## 3. Gas Limit and Loops

We avoid loops that do not have a fixed number of iterations becuase loops can grow beyond the block gas limit and cause the complete contract to be stalled at a certain point. We can also use the `view` keyword in functions which are only executed to read data from the blockchain. This helps save gas. 

```
//SongRegistry.sol

//fetch number of songs
    function getNumberOfSongs() external view returns(uint) {
    // return the length of the song array
    return Songs.length;
    }
```


## 4. Logic Bugs

Simple programming mistakes can lead to logical errors. That is, they can cause the contract to behave differently to its stated rules. We have mitigated this by:
* creating test functions for the SongRegistry contract and implementing unit test in javascript 
* following Solidity coding standards and general coding best practices
