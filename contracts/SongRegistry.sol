pragma solidity >=0.4.22 < 0.6.0;

contract SongRegistry {
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
        address payable owner;
        bool purchased;
    }

  

   //event to be triggered when song is created
    event SongRegistered(
       uint id,
       string title,
       uint price,
       address payable owner,
       bool purchased
    );

    event SongPurchased(
       uint id,
       string title,
       uint price,
       address payable owner,
       bool purchased
    );



   //store songs in array
    Song[] public Songs;

    constructor() public {
        name = "Afrobeats Music Store";
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

    function getNumberOfSongs() external view returns(uint) {
    // return the length of the song array
    return Songs.length;
    }
    //function to buy a song
    function purchaseSong(uint _id) public payable {
        //get the song 
        Song memory song = songs[_id];
        //check that the product id is valid
        require(song.id > 0 &&  song.id <= songCount);
        //check that the song has not been already purchased
        require(!song.purchased,'Sorry! This song has already been purchased.');
        //check that the ether sent is equal to the song price
        require(msg.value == song.price, 'Insufficient funds or Too much! It must be exact!');
        //get the seller/owner 
        address payable owner = song.owner;
        //check that the buyer is not the seller/owner
        require(owner != msg.sender);
        
        //transfer ownership of the song to the buyer
        song.owner = msg.sender;
        //pay the owner 
        address(owner).transfer(msg.value);
        song.purchased = true;
        //update the product
        songs[id] = song;
        //emit event 
        emit SongPurchased(songCount,song.title,song.price,msg.sender,true);





    }
  


    

}