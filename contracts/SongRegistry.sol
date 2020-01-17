pragma solidity >=0.5.0 < 0.6.0;

//import "./Owned.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

////import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract SongRegistry is Ownable {
    string public name;

     //store songs in mapping
   mapping(uint => Song) public songs;

   //keep track on number of songs 
   uint public songCount = 0;

   //define the struct Song 
    struct Song {
        uint id;
        string title;
        uint price;
        address payable Owner;
        bool purchased;
    }

  

   //event to be triggered when song is created
    event SongRegistered(
       uint id,
       string title,
       uint price,
       address payable Owner,
       bool purchased
    );

    event SongPurchased(
       uint id,
       string title,
       uint price,
       address payable Owner,
       bool purchased
    );



   //store songs in array
    Song[] public Songs;

   //store buyers
    mapping (uint => address) public buyers;
   // address[] public buyers;
    constructor() public {
        name = "Afrobeats Music Store";
        registerSong("Risky",1);
        registerSong("Joro",1);
        registerSong("Billionaire",1);

    }

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

    //fetch number of songs
    function getNumberOfSongs() external view returns(uint) {
    // return the length of the song array
    return Songs.length;
    }
    //function to buy a song
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
        require(msg.value == song.price, 'Insufficient funds or Too much! It must be exact!');
        //get the seller/owner and store to variable owner
        address payable seller = song.Owner;
        //check that the buyer is not the seller/owner
          require(seller != msg.sender);
        
        //transfer ownership of the song to the buyer
        song.Owner = msg.sender;
        //pay the owner 
        address(seller).transfer(msg.value);
        //mark the song as purchased
        song.purchased = true;
        //update the purchased product in the mapping
        songs[_id] = song;
        buyers[_id] = msg.sender;
    
        //emit event to declare song has been purchased successfully
        emit SongPurchased(songCount,song.title,song.price,msg.sender,true);

    
    }
    
   // function getBuyers() external view returns(address[] memory) {
    // return the length of the song array
  //  return buyers;
  //  }

     function kill() private onlyOwner {
        if(msg.sender == owner()) selfdestruct(address(uint160(owner()))); // cast owner to address payable
      }

      


    

}