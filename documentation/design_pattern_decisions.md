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

The `require` keyword is used throughout the contract to check as early as possible whether certain conditions are met. This helps reduce unnecessary code execution. 

```
//SongRegistry.sol

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
    
    function purchaseSong(uint _id) payable public {
        //get the song from the mapping
        Song memory song = songs[_id];
        //check whether there is at least one song
        require(songCount > 0);
        //check that the product id is valid
        require(song.id > 0 &&  song.id <= songCount);
        //check that the song has not been already purchased
        require(!song.purchased,'Sorry! This song has already been purchased.');
        //check that the ether sent is equal to the song price
        require(msg.value >= song.price, 'Insufficient funds or Too much! It must be exact!');
        //get the seller/owner and store to variable owner
        ....
        ....
        ....
        ....
      }
       
```


## 3. Circuit Breaker

This gives the admin/owner the ability to stop state-changing functionalities during emergencies and discovery of critical bugs. We use the boolean variable `emergency` and modifiers `onlyInEmergency ` and `onlyOwner` in the `kill` function as follows:

```
//SongRegistry.sol


 bool private emergency = false;

    //circut breaker modifier
    modifier onlyInEmergency { 
    require(emergency);  _;
    
    function kill() public onlyOwner onlyInEmergency {
        if(msg.sender == owner()) selfdestruct(address(uint160(owner()))); // cast owner to address payable
      }

}
```

## 4. Mortal

This design pattern gives the admin/owner ability to destroy the contract and remove it from the blockchain using the `selfdestruct` keyword in the `kill` function. After destruction, the remaining balance is sent to the admin’s address.
```
//SongRegistry.sol

  function kill() public onlyOwner onlyInEmergency {
        if(msg.sender == owner()) selfdestruct(address(uint160(owner()))); // cast owner to address payable
      }

```
