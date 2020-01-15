const SongRegistry = artifacts.require('./SongRegistry.sol')

//require('chai')
  //.use(require('chai-as-promised'))
 // .should()

contract('SongRegistry', ([deployer,seller,buyer]) => {
    let songregistry
    


    //get instance of contract
    before(async () => {
        songregistry = await SongRegistry.deployed()
    }) 

    //checks that the smart contract has an address
    describe('deploying of contract', async() => {
        it('contract deployment successful', async() => {
            var contractAddress = await songregistry.address
            assert.notEqual(contractAddress,null)
            assert.notEqual(contractAddress,undefined)
            assert.notEqual(contractAddress,0x0)
        })
    })

    describe('Song Registration', async() => {
        let songCount, product
        //predefine parameters
        const songTitle = "Risky"
        const songPrice = web3.utils.toWei('1', 'Ether')

        before(async () => {
            product = await songregistry.registerSong(songTitle,songPrice, {from: seller})
            //get number of songs
            songCount = await songregistry.songCount()
            count = await songregistry.getNumberOfSongs() 
        })

        it('registers songs', async() => {
            //check that there is 1 song available
            assert.equal(songCount,1)
            assert.equal(count,1)

            //check song details
            let song = await songregistry.Songs(0)
            assert.equal(song['owner'], seller, 'owner matches')
            assert.equal(song['title'], songTitle, 'title matches')
            assert.equal(song['price'], songPrice, 'price matches')
            assert.equal(song['purchased'], false,'purchased is correct')
            
        })
    })

})
