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
        address owner;
        bool purchased;
    }

  

   //event to be triggered when song is created
    event SongRegistered(
       uint id,
       string title,
       uint price,
       address owner,
       bool purchased
    );

   //store songs in array
    Song[] public Songs;

    constructor() public {
        name = "Afrobeats Music Store";
    }

    //a function to register songs
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


    

}