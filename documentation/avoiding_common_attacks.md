# Afrobeats Song Registry Security Tools

The following document outlines the project security tools implemented in the SongRegistry smart contract to ensure that the contract is not susceptible to common attacks . 

## 1. MythX (Remix extension)

MythX is a tool for finding smart contract weaknesses. The MythX extension for Remix was used to check for weaknesses in the `SongRegistry` contract


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
* creating test functions for the SongRegistry contract and implementing unit test in javascript .
* following Solidity coding standards and general coding best practices.


## 5. Using events to monitor contract activity

Events have been used to monitor the contract's activity after being deployed. Uising events is a convenient way to log something that happened in the contract. Events that were emitted stay in the blockchain along with the other contract data and they are available for future audit. In the `SongRegistry.sol` contracts, events are triggered when a song is registered and when a song is putchased. 
```
//SongRegistry.sol

//event to be triggered when song is registered
    event SongRegistered(
       uint id,
       string title,
       uint price,
       address payable Owner,
       bool purchased
    );

    //event to be triggered when song is purchased
    event SongPurchased(
       uint id,
       string title,
       uint price,
       address payable Owner,
       bool purchased
    );

    function registerSong(string memory _title,uint _price) public {
        ...
        ...
        //check if the price is valid
        require(_price > 0, "Invalid song price.");
        ...
        ...
        emit SongRegistered(songCount,_title,_price,msg.sender,false)
    }
    
    function purchaseSong(uint _id) payable public {
        ...
        ...
        ... 
        //emit event to declare song has been purchased successfully
         emit SongPurchased(songCount,song.title,song.price,msg.sender,true);

    }

```


## 6. Using the Checks-Effects-Interactions Pattern

The functions first perform some checks such as checking whether input is valid or whether sender has enough ether. If all checks have passed, effects to the state variables of the current contract should be made. Interactions with other contracts are the last step. For example in the `registerSong` function below, we first perform checks and then update state variables.  

```
//function to register a song
    function registerSong(string memory _title,uint _price) public {
        //check if title is valid
        require(bytes(_title).length > 0, "Invalid song title.");

        //check if the price is valid
        require(_price > 0, "Invalid song price.");
        //increase song count
        songCount ++;
        //create song
        Songs.push(Song(songCount,_title,_price,msg.sender,false));
        songs[songCount] = Song(songCount,_title,_price,msg.sender,false);
        emit SongRegistered(songCount,_title,_price,msg.sender,false);


    }
```



