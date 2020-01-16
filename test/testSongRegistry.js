const SongRegistry = artifacts.require('./SongRegistry.sol')

require('chai')
   .use(require('chai-as-promised'))
   .should()

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
            //registers a song and assigns it to object product
            product = await songregistry.registerSong(songTitle,songPrice, {from: seller})
            //get number of songs
            songCount = await songregistry.songCount()
            count = await songregistry.getNumberOfSongs() 
        })

        it('test song registration', async() => {
            //check that there is 1 song available
            //we check that registering the song count increased the song count by 1
            assert.equal(songCount,1)
            assert.equal(count,1)

            //check song details
            //we get the first song in array of songs to check whether 
            //the song that was registered has the correct details 
            let song = await songregistry.Songs(0)
            assert.equal(song['owner'], seller, 'owner matches')
            assert.equal(song['title'], songTitle, 'title matches')
            assert.equal(song['price'], songPrice, 'price matches')
            assert.equal(song['purchased'], false,'purchased is correct')
            
        })
        it('test song purchase', async() => {
            //get initial balance of seller/owner
            let initialSellerBalance = await web3.eth.getBalance(seller);
            //initialSellerBalance = new web3.utils.BN(initialSellerBalance)

            //let buyer purchase song from seller
            purchase = await songregistry.purchaseSong(songCount,{from: buyer, value: songPrice })
            
            //check song details for purchased song
            const event = purchase.logs[0].args
            assert.equal(event.id.toNumber(), songCount.toNumber(), 'id is matches')
            assert.equal(event.title, songTitle, 'title matches')
            assert.equal(event.owner, buyer,'owner matches')
            assert.equal(event.price, songPrice, 'price matches')
            assert.equal(event.purchased,true,'purchased is correct')

            //check to see whether seller recieved funds
            let newBalance = await web3.eth.getBalance(seller)
               
            //update seller balance
           const exepectedSellerBalance = Number(initialSellerBalance) + Number(songPrice)

           assert.equal(newBalance, Number(exepectedSellerBalance),'seller successfully received funds')

           //FAILURES
           //=======================
           //buyer purchases product with invalid id
            await songregistry.purchaseSong(26, { from: buyer, value: songPrice}).should.be.rejected;  
            //buyer has insufficient funds
             await songregistry.purchaseSong(songCount, { from: buyer, value: web3.utils.toWei('0.2', 'Ether') }).should.be.rejected;  
            //buyer has too much funds
              await songregistry.purchaseSong(songCount, { from: buyer, value: web3.utils.toWei('3', 'Ether') }).should.be.rejected;  
            //buyer purchases a song twice
            await songregistry.purchaseSong(songCount, { from: buyer, value: songPrice}).should.be.rejected;  
            //buyer is also owner
            await songregistry.purchaseSong(songCount, { from: seller, value: songPrice}).should.be.rejected;  
        })

    })



})
