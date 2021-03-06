App = {
  web3Provider: null,
  contracts: {},
  account: 0x0,

  init: async function() {
    // Load pets.
    $.getJSON('../songs.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].title);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.price').text(data[i].price );
        petTemplate.find('.pet-age').text(data[i].id);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);
        petTemplate.find('.btn-adopt').attr('data-value', data[i].price);

        petsRow.append(petTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {
          // Modern dapp browsers...
      if (window.ethereum) {
        App.web3Provider = window.ethereum;
        try {
          // Request account access
          await window.ethereum.enable();
        } catch (error) {
          // User denied account access...
          console.error("User denied account access")
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        App.web3Provider = window.web3.currentProvider;
      }
      // If no injected web3 instance is detected, fall back to Ganache
      else {
        App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
      }
      web3 = new Web3(App.web3Provider);
    App.displayAccountInfo();
    return App.initContract();
  },

  displayAccountInfo: function() {
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#account").text(account);
        web3.eth.getBalance(account, function(err, balance) {
          if (err === null) {
            $("#accountBalance").text(web3.fromWei(balance, "ether") + " ETH");
          }
        });
      }
    });
  },



  initContract: function() {
    $.getJSON('SongRegistry.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var SongRegistryArtifact = data;
      App.contracts.SongRegistry = TruffleContract(SongRegistryArtifact);
    
      // Set the provider for our contract
      App.contracts.SongRegistry.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the adopted pets
      //check this 
       //  return App.markPurchased();
    });
  

    return App.bindEvents();
    
    
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.purchaseItem);
   
    
  },

  markPurchased: function() {

   $("#buyButton").text("Success").attr('disabled', true);
   // petTemplate.find('.btn-adopt').text("Success").attr('disabled', true);

  },
  // markPurchased: function(buyers, account) {
  //   /*
  //    * Replace me...
  //    */
  //   var songRegistryInstance;

  //   App.contracts.SongRegistry.deployed().then(function(instance) {
  //     songRegistryInstance = instance;

  //     return songRegistryInstance.getBuyers.call();
  //   }).then(function(buyers) {
  //     for (i = 0; i < buyers.length; i++) {
  //       if (buyers[i] !== '0x0000000000000000000000000000000000000000') {
  //         $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
  //       }
  //     }
  //   }).catch(function(err) {
  //     console.log(err.message);
  //   });

  // },

  // handlePurchase: function(event) {
  //     event.preventDefault();

  //   var _songId = parseInt($(event.target).data('id'));
  //  // var _price = web3.toWei(parseFloat($("#song_price").val() || 0), "ether");
  //    var _price = parseFloat($(event.target).data('value'));


  //   var songRegistryInstance;

  //   web3.eth.getAccounts(function(error, accounts) {
  //     if (error) {
  //       console.log(error);
  //     }

  //     var account = accounts[0];

  //     App.contracts.SongRegistry.deployed().then(function(instance) {
  //       songRegistryInstance = instance;

  //       // Execute adopt as a transaction by sending account
  //       return songRegistryInstance.purchaseSong(_songId, {from: account, value: web3.toWei(_price, "ether")});
  //     }).then(function(result) {
  //       return App.markPurchased();
  //     }).catch(function(err) {
  //       console.log(err.message);
  //     });
  //   });
  // }, 

  purchaseItem: function() {
    event.preventDefault();

    var _songId = parseInt($(event.target).data('id'));
   // var _price = web3.toWei(parseFloat($("#song_price").val() || 0), "ether");
     var _price = parseFloat($(event.target).data('value'));


    var songRegistryInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.SongRegistry.deployed().then(function(instance) {
        songRegistryInstance = instance;

        // Execute adopt as a transaction by sending account
        return songRegistryInstance.purchaseSong(_songId, {from: account, value: web3.toWei(_price, "ether"), gas: 5000000});
      }).then(function(result) {

      }).catch(function(err) {
        console.log(err.message);
      });
    });
       // App.markPurchased();
       
  }





};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
