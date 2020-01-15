const SongRegistry = artifacts.require("SongRegistry");

module.exports = function(deployer) {
  deployer.deploy(SongRegistry);
};